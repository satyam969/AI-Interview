// app/api/resume/generate/route.ts

import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import mammoth from 'mammoth';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import PDFParser from 'pdf2json';
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';

async function parsePDFWithPDF2JSON(buffer: Buffer): Promise<string> {
  const tmpDir = process.platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp';
  const fileName = `${tmpDir}/${uuidv4()}.pdf`;

  await fs.writeFile(fileName, buffer);

  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on('pdfParser_dataError', (err: any) => {
      reject(err.parserError);
    });

    pdfParser.on('pdfParser_dataReady', () => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });

    pdfParser.loadPDF(fileName);
  });
}

async function parseDOCX(buffer: Buffer): Promise<string> {
  const { value } = await mammoth.extractRawText({ buffer });
  return value;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const userId = formData.get('userid') as string | null;

    if (!file || !userId) {
      return NextResponse.json({ success: false, error: 'Missing file or userId' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let resumeText = '';

    if (file.type === 'application/pdf') {
      resumeText = await parsePDFWithPDF2JSON(buffer);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      resumeText = await parseDOCX(buffer);
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported file type' }, { status: 400 });
    }

    if (!resumeText.trim()) {
      return NextResponse.json({ success: false, error: 'Parsed resume is empty.' }, { status: 400 });
    }

    // console.log('✅ Extracted resume text length:', resumeText.length);
    // console.log('🔍 Preview:', resumeText.slice(0, 150));

    const prompt = `You are an AI interviewer and resume analyzer.

    Based on the following resume content:
    """
    ${resumeText}
    """
    
    1. Generate exactly 3 personalized interview questions.
       - Tailor the questions to the candidate's specific skills, projects, technologies, achievements, or job experiences.
       - Use terminology found in the resume (e.g., tech stacks, tools, company names).
       - Questions must be natural and suitable for verbal delivery.
       - Do not include "/", "*", or special characters that could break voice-based rendering.
    
    2. Extract a list of all technologies, tools, or frameworks mentioned in the resume.
       - Examples: React, Python, MongoDB, Docker, etc.
    
    Return only a valid JSON object in the following format:
    {
      "questions": [
        "Question 1",
        "Question 2",
        "Question 3"
      ],
      "techstack": [
        "Tech 1",
        "Tech 2",
        "Tech 3"
      ]
    }
    
    Important:
    - Do not include any explanation, markdown, or other text outside the JSON object.
    - Ensure the output is strictly valid JSON.
    `;
    
    
    const { text } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt,
    });
    
   
    
    let parsedResult: { questions: string[]; techstack: string[] };

    try {
      const cleanText = text
        .trim()
        .replace(/^```json\s*/i, '') // remove ```json at start
        .replace(/```$/i, '')        // remove ``` at end
        .trim();
    
      parsedResult = JSON.parse(cleanText);
    
      if (
        !Array.isArray(parsedResult.questions) ||
        parsedResult.questions.length !== 3 ||
        !Array.isArray(parsedResult.techstack)
      ) {
        throw new Error('Invalid format from Gemini');
      }
    } catch (err) {
      console.error('❌ JSON Parse Error:', text);
      return NextResponse.json(
        { success: false, error: 'Model did not return valid JSON structure.' },
        { status: 500 }
      );
    }
    

    // console.log(parsedResult);
    
    const interview = {
      role: 'Resume-based',
      type: 'Mixed',
      level: 'N/A',
      techstack: parsedResult.techstack,
      questions: parsedResult.questions,
      userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };
    

    const docRef = await db.collection('interviews').add(interview);

   
    const fullInterview = {
      ...interview,
      id: docRef.id,
    };
    

    return NextResponse.json({ success: true,interview:fullInterview }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 });
  }
}
