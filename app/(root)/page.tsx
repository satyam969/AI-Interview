import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {dummyInterviews} from '@/constants/index'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
   <>
   <section className='card-cta'>

    <div className='flex flex-col gap-6 max-w-lg '>
      <h2> Get Interview Ready With AI-Powered Practice & FeedBack</h2>
      <p className='text-lg'>
        Practice On Real Interview Question & Get Instant FeedBack
      </p>
      <Button asChild className='btn-primary max=sm:w-full'>
       <Link href='/interview'>
       Start An Interview
       </Link>
      </Button>
      <Image className='mx-sm:hidden' src='/robot.png' alt="robo-dude" width={400} height={400} />
    </div>

   </section>
   <section className='flex flex-col mt-8 gap-6'>
   <h2> Your Interview </h2>
   <div className='interview-section'>

   {dummyInterviews?.map((interview)=>(
   <InterviewCard key={interview.id} {...interview}/>
   )) 

  }

   </div>
   </section>
   <section className='flex flex-col gap-6 mt-8'>
   <h2>
    Take An Interview
   </h2>
   <div className='interview-section'>
    {dummyInterviews?.map((interview)=>(
   <InterviewCard key={interview.id} {...interview}/>
   )) 
  }
   </div>
   </section>
   </>
  )
}

export default page
