import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews} from '@/lib/actions/general.action';
import ResumeInterviewUpload from '@/components/ResumeInterviewUpload';

const Page = async() => {
  const user =await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const haspastInteriews=userInterviews?.length!>0;
  const hasUpcomingInterviews=latestInterviews?.length!>0;
  
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

   {/* Resume Upload Section */}
   <ResumeInterviewUpload userId={user?.id || ''} />

   <section className='flex flex-col mt-8 gap-6'>
   <h2> Your Interview </h2>
   <div className='interview-section'>
   {haspastInteriews ? (userInterviews?.map((interview)=>(
   <InterviewCard key={interview.id} {...interview}/>
   ) )  ) :
   (
    <p>You haven&apos;t taken any interviews yet</p>
  )}
   </div>
   </section>
   <section className='flex flex-col gap-6 mt-8'>
   <h2>
    Take An Interview
   </h2>
   <div className='interview-section'>
   {hasUpcomingInterviews ? (latestInterviews?.map((interview)=>(
   <InterviewCard key={interview.id} {...interview}/>
   ) )  ) :
   (
    <p>There are no new interviews available</p>
  )}
   </div>
   </section>
   </>
  )
}

export default Page
