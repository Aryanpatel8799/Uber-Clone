import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import  { useState,useRef } from 'react'
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import FinishRide from '../componants/FinishRide';
import LiveTracking from '../componants/LiveTracking';

const CaptainRiding = () => {

    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    console.log(rideData);

   
    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])

  return (
    <div className='h-screen relative flex flex-col justify-end'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                
            </div>

            <div className='h-35 p-6 flex items-center justify-between relative bg-white pt-10'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {
                     
                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='mt-3 text-xl font-semibold'>{'4 KM away'}</h4>
                <button className='mt-3 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    RideData={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>

            <div className='h-screen fixed w-screen top-0 z-[-1]'>
            <LiveTracking />
            </div>

        </div>
  )
}

export default CaptainRiding