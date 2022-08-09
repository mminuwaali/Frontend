import React, {useContext, useEffect, useState} from 'react';
import { Navbar } from './Navbar';
import AuthContext from '../../context/AuthContext';
import enoch from '../../assets/enoch.jpg';


export const UserProfile = () => {
  const {user, getUserMeHandler} = useContext(AuthContext)

  useEffect(() =>{
    getUserMeHandler();
  }, [])

  return (
    <>
    <Navbar />
  {/* <button className='bg-blue p-2' onClick={getUserMeHandler}>GET</button> */}

    <section className='bg-[#f5f5f5]'>
      <div className='container mx-auto rounded-[40px] bg-white'>
        <h1 className='font-[700] pt-[2rem] text-2xl'>Profile</h1>
        <div className='container mx-auto '>

        <div className='flex mt-[2rem] flex-col md:flex-row gap-x-[200px]'>
          <div className='flex flex-col md:flex-row gap-x-[1rem]  items-center'>
            <div className='w-[130px] h-[130px]'>
            <img className='rounded-full ' src={enoch} alt="" />
            </div>
            <div className=''>
              <h1 className='font-[700] text-[20px]'>{user.user && user.user.first_name} {user.user && user.user.last_name}</h1>
              <small>Location</small>
            </div>


          </div>

          <div className='max-w-[600px]'>
            <h1 className='font-[700] text-[18px]'>Bio</h1>
            <p>
            {user && user.bio}
            {!user.bio && <p>.</p> }
            </p>
          </div>

        </div>
  

        </div>

        </div>


    </section>
    </>
  )
}
