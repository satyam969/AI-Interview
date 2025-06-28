import React from 'react';
import Image from 'next/image';


const stepsFlow1 = [
  {
    text: 'Click "Create an Interview" on your dashboard.',
    img: '/createinterview.png',
    alt: 'Create Interview',
  },
  {
    text: 'Follow the AI assistant to set up your custom interview.',
    img: '/ai-screen.png',
    alt: 'AI Screen',
  },
  {
    text: 'After setup, view your new interview in the dashboard.',
    img: '',
    alt: '',
  },
  {
    text: 'Click "Start Interview" to begin. The AI will conduct your interview.',
    img: '',
    alt: '',
  },
  {
    text: 'Press "End Call" when finished.',
    img: '',
    alt: '',
  },
  {
    text: 'View detailed feedback on your performance.',
    img: '/feedback.png',
    alt: 'Feedback',
  },
];

const stepsFlow2 = [
  {
    text: 'Upload your resume in the provided section.',
    img: '/generatefromresume.png',
    alt: 'Generate from Resume',
  },
  {
    text: 'The system generates an interview based on your resume.',
    img: '',
    alt: '',
  },
  {
    text: 'Click "Take Interview" to start, or "Regenerate" for reuploading.',
    img: '',
    alt: '',
  },
  {
    text: 'All interviews are saved in your dashboard for later access.',
    img: '',
    alt: '',
  },
  {
    text: 'The interview and feedback process is the same as 1.',
    img: '/feedback.png',
    alt: 'Feedback',
  },
];

const tips = [
  'All your interviews are accessible from the dashboard.',
  'You can retake or regenerate interviews anytime.',
  'You can take the same interview multiple times and see your last feedback.',
  'Feedback is always available after each interview.'
];

export default function HowToUsePage() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center">How to Use InterviewAi</h1>
      <div className="flex flex-col gap-8 md:flex-row md:gap-6">
        <section className="flex-1 bg-muted rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">1. Create a Custom Interview</h2>
          <ol className="list-decimal list-inside space-y-6 pl-4">
            {stepsFlow1.map((step, idx) => (
              <li key={idx} className="text-base flex flex-col gap-2">
                {step.text}
                {step.img && (
                  <div className="flex justify-center">
                    <Image src={step.img} alt={step.alt} width={400} height={250} className="rounded-lg border" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
        <section className="flex-1 bg-muted rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">2. Quick Interview via Resume Upload</h2>
          <ol className="list-decimal list-inside space-y-6 pl-4">
            {stepsFlow2.map((step, idx) => (
              <li key={idx} className="text-base flex flex-col gap-2">
                {step.text}
                {step.img && (
                  <div className="flex justify-center">
                    <Image src={step.img} alt={step.alt} width={400} height={250} className="rounded-lg border" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>
      <section className="bg-muted rounded-lg p-4 mt-10 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Tips</h3>
        <ul className="list-disc list-inside space-y-1">
          {tips.map((tip, idx) => (
            <li key={idx} className="text-base">{tip}</li>
          ))}
        </ul>
      </section>
    </main>
  );
} 