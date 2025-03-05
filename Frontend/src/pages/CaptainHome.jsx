import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../../componants/CaptainDetails'
import RidePopup from '../../componants/RidePopup'
import { useState,useRef } from 'react'
import {useGSAP} from "@gsap/react";
import { gsap } from "gsap";
import ConfirmRidePopUp from '../../componants/ConfirmRidePopUp'

const CaptainHome = () => {

    const [Ridepopuppanel, setRidepopuppanel] = useState(false)
    const RidepopupRef=useRef();
    const RidepopupClose=useRef();

    const [ConfirmRidepopuppanel, setConfirmRidepopuppanel] = useState(false)
    const ConfirmRidepopupRef=useRef();
    const ConfirmRidepopupClose=useRef();

  
    useGSAP(function()
    {
      if(Ridepopuppanel)
      {
        gsap.to(RidepopupRef.current, {
          transform: "translateY(0%)",
  
        })
        gsap.to(RidepopupClose.current, {
          hidden: false,
        })
      }
      else
      {
        gsap.to(RidepopupRef.current, {
          transform: "translateY(100%)",
        })
        gsap.to(RidepopupClose.current, {
          hidden:true
        })
      }
    },[Ridepopuppanel])

    useGSAP(function()
    {
      if(ConfirmRidepopuppanel)
      {
        gsap.to(ConfirmRidepopupRef.current, {
          transform: "translateY(0%)",
  
        })
        gsap.to(ConfirmRidepopupClose.current, {
          hidden: false,
        })
      }
      else
      {
        gsap.to(ConfirmRidepopupRef.current, {
          transform: "translateY(100%)",
        })
        gsap.to(ConfirmRidepopupClose.current, {
          hidden:true
        })
      }
    },[ConfirmRidepopuppanel])

  return (
    <div className='h-screen'>
    <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
    </div>
    <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
    </div>
    <div className='h-2/5 p-6' onClick={()=>{setRidepopuppanel(true)}}>
        <CaptainDetails />
    </div>
    <div ref={RidepopupRef} className='flex flex-col w-full px-3 py-4 fixed translate-y-full z-10 bottom-0 bg-white'> 
           <RidePopup RidepopupClose={RidepopupClose} setRidepopuppanel={setRidepopuppanel} setConfirmRidepopuppanel={setConfirmRidepopuppanel} />
    </div>
    <div ref={ConfirmRidepopupRef} className='flex flex-col w-full px-3 py-4 fixed translate-y-full z-10 bottom-0 bg-white'> 
           <ConfirmRidePopUp ConfirmRidepopupClose={ConfirmRidepopupClose} setRidepopuppanel={setRidepopuppanel} setConfirmRidepopuppanel={setConfirmRidepopuppanel} />
    </div>
</div>
  )
}

export default CaptainHome