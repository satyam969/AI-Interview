'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';





interface ResumeInterviewUploadProps {
  userId: string;
}

const ResumeInterviewUpload: React.FC<ResumeInterviewUploadProps> = ({ userId }) => {
  const [resumeInterview, setResumeInterview] = useState<Interview | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const handleReset=()=>{
    setResumeInterview(null);
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setResumeInterview(null);
    setProgress(0);
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid', userId);
    setUploading(true);
    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open('POST', '/api/resume/generate', true);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        if (data.success && data.interview) {
          setResumeInterview(data.interview as Interview);
        } else {
          setError(data.error || 'Failed to generate interview');
        }
      } else {
        setError('Failed to upload or parse resume');
      }
      setProgress(0);
      xhrRef.current = null;
    };
    xhr.onerror = () => {
      setUploading(false);
      setError('Failed to upload or parse resume');
      setProgress(0);
      xhrRef.current = null;
    };
    xhr.onabort = () => {
      setUploading(false);
      setError('Upload cancelled');
      setProgress(0);
      xhrRef.current = null;
    };
    xhr.send(formData);
  };

  const handleCancel = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
    }
  };

  return (
    <section className='flex flex-col gap-4 mt-8'>
      <h2>Generate Interview from Resume</h2>
    {!resumeInterview &&   <Input
    className=' w-70 h-10 border-2'
        type='file'
        accept='.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword'
        onChange={handleResumeUpload}
        disabled={uploading}
      />}
      {uploading && (
        <div className='flex flex-col gap-2'>
          <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
            <div
              className='bg-blue-600 h-2.5 rounded-full transition-all duration-200'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span>{progress}%</span>
          <button
            className='btn-secondary w-fit mt-2 px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600'
            onClick={handleCancel}
            type='button'
          >
            Cancel
          </button>
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