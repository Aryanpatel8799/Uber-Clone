import React from 'react'
import { useState,useRef } from 'react'
import {useGSAP} from "@gsap/react";
import { gsap } from "gsap";

const RidePopup = (props) => {
    console.log();
    
 return (
    <>
    <h5 ref={props.RidepopupClose}
    onClick={()=>{props.setRidepopuppanel(false)}} className='p-1 text-center w-[93%] absolute top-0' ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
    <h3 className='text-2xl font-semibold mb-5 mt-5'>New Ride Available!</h3>
    <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3 '>
            <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
            <h2 className='text-lg font-medium capitalize'>{props.RideData.user?.fullname.firstname +" "+ props.RideData.user?.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
    </div>
    <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{props.RideData?.origin}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>opp. Nisarg Hostel , Anand</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{props.RideData?.destination}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>opp. Nisarg Hostel , Anand</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹ {props.RideData?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
        </div>
        <div className='mt-5 w-full '>
            <button onClick={()=>{
                props.setConfirmRidepopuppanel(true)
                props.confirmRide()
                }} className=' bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

            <button onClick={()=>{props.setRidepopuppanel(false)}} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>

        </div>
    </div>
</>
  )
}

export default RidePopup