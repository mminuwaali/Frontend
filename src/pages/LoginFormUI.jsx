import React from 'react';
import { Footer } from '../components/Footer';
import { LoginForm } from '../components/Forms/LoginForm';
import { LoginFormMobile } from '../components/Forms/LoginFormMobile';



export const LoginFormUI = () => {

  return (
    <>
    <section className='flex justify-center items-center lg:hidden'>
      <div className='w-[500px]'>
      <LoginFormMobile />

      </div>
    </section>


    <section className='hidden lg:block relative bg-hero lg:pt-[70px] lg:pb-[70px]  h-full bg-center  bg-cover bg-no-repeat'>
    {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02378B] opacity-40 z-[100] ">
  </div> */}
  <div className='container mx-auto flex flex-col lg:flex-row lg:gap-x-[100px] z-[999]'>
    <div>
    <h2 className='title text-[35px] font-heading lg:text-[66px] z-[999] font-[700] text-white max-w-[600px]'>Have Great Jobs
      Find You!</h2>
    <p className='subtitle text-[25px] z-[999] lg:text-[36px] text-white max-w-[600px] '>
      Find Jobs that match Your interests
      on EduJobs NG
    </p>
    </div>

 <LoginForm />

  </div>
  
</section>

</>

  )
}


