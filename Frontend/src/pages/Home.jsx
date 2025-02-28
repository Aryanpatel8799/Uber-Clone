import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover  bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_690,w_552/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png)] pt-8 h-screen flex justify-between flex-col w-full'>
                <img className='w-25 ml-7' src="https://logohistory.net/wp-content/uploads/2023/06/Uber-Logo.png" alt="" />
                <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                <Link to='/login' className='flex justify-center items-center bg-black text-white py-2 px-4 rounded mt-5 mb-1 w-full'>Continue</Link>
                </div>
        </div>
    </div>
    
  )
}

export default Home