'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import axios from 'axios';


interface ResumeResponse {
  success: boolean;
  interview?: any; // Replace 'any' with the actual interview object type if known
  error?: string;
}






interface ResumeInterviewUploadProps {
  userId: string;
}

const ResumeInterviewUpload: React.FC<ResumeInterviewUploadProps> = ({ userId }) => {
  const [resumeInterview, setResumeInterview] = useState<Interview | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');


  const handleReset=()=>{
    setResumeInterview(null);
  }
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setResumeInterview(null);
    setProgress(0);
  
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid', userId);
  
    // Inline type for config object
    const config: {
      headers: { [key: string]: string };
      onUploadProgress: (progressEvent: ProgressEvent) => void;
    } = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        if (progressEvent.lengthComputable) {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        }
      },
    };
  
    setUploading(true);
    try {
      const res = await axios.post<{
        success: boolean;
        interview?: any; // You can replace `any` with a proper Interview type
        error?: string;
      }>('/api/resume/generate', formData, config);
  
      setUploading(false);
  
      if (res.data.success && res.data.interview) {
        setResumeInterview(res.data.interview);
      } else {
        setError(res.data.error || 'Failed to generate interview');
      }
    } catch (err) {
      setUploading(false);
      setError('Failed to upload or parse resume');
    }
  
    setProgress(0);
  };
  


  return (
    <section className='flex flex-col gap-4 mt-8'>
      <h2>Generate Interview from Resume (&lt;1Mb)</h2>
      {!resumeInterview && (
        <div className="relative w-fit">
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            onChange={handleResumeUpload}
            disabled={uploading}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 2,
            }}
          />
          <label htmlFor="resume-upload" className="btn-primary cursor-pointer px-5 py-2 rounded-full font-bold block text-center">
            Choose File
          </label>
        </div>
      )}
      {uploading && (
        <div className='flex flex-col gap-2'>
          <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
            <div
              className='bg-blue-600 h-2.5 rounded-full transition-all duration-200'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span>{progress}%</span>
        
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      {resumeInterview && (
        <div className='flex flex-row gap-2'>

        <Button className='btn-primary'>
        <Link href={ 
            `/interview/${resumeInterview?.id}`} >
          Take Interview
        </Link>
       </Button>

       <Button className='btn-secondary' onClick={handleReset}>
       
          Regenerate

       </Button>


            </div>
      )}
    </section>
  );
};

export default ResumeInterviewUpload; 