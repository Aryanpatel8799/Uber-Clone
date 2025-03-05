import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='w-screen h-1/2'>
        <img className='w-full h-full object-cover' src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt=""/>
      </div>
            <div className='flex mt-8 items-center justify-between'>
        <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right  mr-2 flex flex-col justify-evenly'>
          <h2 className='text-2xl font-medium capitalize'>Jainil Parmar</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>GJ 01 EE 1234</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>  OTP </h1>
        </div>
      </div>

      <div className='flex mt-7 items-center justify-between flex-col  p-2'>
        <div className='flex flex-row justify-between items-center border-b-3 border-b-gray-300  h-20 w-full'>
              <h5 className='text-2xl font-semibold items-center justify-center flex'><i className="ri-route-line"></i></h5>
              <div className='flex flex-col items-start ml-4 mt-3  h-20 w-full'>
              <h3 className='text-2xl font-bold'>Charusat University</h3>
              <h4 className='text-base font-semibold'>opp. Nisarg Hostel , Anand</h4>
              </div>
          </div>
          <div className='flex flex-row justify-between items-center border-b-3 border-b-gray-300  h-20 w-full'>
              <h5 className='text-2xl font-semibold items-center justify-center flex'><i className="ri-route-line"></i></h5>
              <div className='flex flex-col items-start ml-4 mt-4  h-20 w-full'>
              <h3 className='text-2xl font-bold'>Hotel Blueberry</h3>
              <h4 className='text-base font-semibold'>opp. Nisarg Hostel , Anand</h4>
              </div>
          </div>
          <div className='flex flex-row justify-between items-center border-b-3 border-b-gray-300  h-20 w-full'>
              <h5 className=' text-2xl font-semibold items-center justify-center flex'><i className="ri-bank-card-fill"></i></h5>
              <div className='flex flex-col items-start ml-4 mt-4 h-20 w-full'>
              <h3 className='text-2xl font-bold'>₹ 100</h3>
              <h4 className='text-base font-semibold'>Cash / Card / UPI</h4>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Riding