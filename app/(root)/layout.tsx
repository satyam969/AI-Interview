import { Button } from '@/components/ui/button'
import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const RootLayout = async ({children}:{children:React.ReactNode}) => {
  const isUserAuthenticated =await isAuthenticated();
  if(!isUserAuthenticated){
    redirect('/sign-in')
  }
  return (
    <div className='root-layout'>
     <nav className='flex flex-row justify-between gap-6'>
      <Link href='/' className='flex items-center gap-2'>
      <Image src='/logo.svg' alt="logo" width={38} height={32} />
      <h2 className='text-primary-100'>Interview-AI</h2>
      </Link>
      <Button className='btn-secondary'>
      <Link href='/how-to-use'>How to Use</Link>
      </Button>
     </nav>
      {children}
    </div>
  )
}

export default RootLayout
