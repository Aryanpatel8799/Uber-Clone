import React, { useRef } from 'react'
import { useState } from 'react'
import {useGSAP} from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../../componants/LocationSearchPanel';
import ConfirmRide from '../../componants/ConfirmRide';
import CabBooking from '../../componants/CabBooking';
import LookingForDriver from '../../componants/LookingForDriver';
import WaitingForDriver from '../../componants/WaitingForDriver';

const Home = () => {
  const [pickup, setpickup] = useState('')
  const [Destination, setDestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const [VehicalPanel, setVehicalPanel] = useState(false)
  const [confirmVehical, setconfirmVehical] = useState(false)
  const [waitingForDriver,setwaitingForDriver] = useState(false)
  const panelRef = useRef(null)
  const panelClose = useRef(null)
  const Vehicalref = useRef(null);
  const VehicalClose = useRef(null);
  const Confirmref = useRef(null);
  const ConfirmClose = useRef(null);
  const [lookingForDriver, setLookingForDriver] = useState(false)
  const lookingForDriverRef = useRef(null);
  const lookingForDriverClose = useRef(null);
  const WaitingRef = useRef(null);
  const WaitingClose = useRef(null);

  const submitHandler=(e)=>{
    e.preventDefault();
  }

   useGSAP(function () {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: "75%",
        display:"block",
        animation:"ease-in"
      })
      gsap.to(panelClose.current, {
        hidden: false,
      })
    }
    else{
      gsap.to(panelRef.current, {
        height: "0%",
        display:"none",
        animation:"ease-out"
      })
      gsap.to(panelClose.current, {
        hidden: true
      })
    }
    
   }, [panelOpen])

   useGSAP(function()
  {
    if(VehicalPanel)
    {
      gsap.to(Vehicalref.current, {
        transform: "translateY(0%)",

      })
      gsap.to(VehicalClose.current, {
        hidden: false,
      })
    }
    else
    {
      gsap.to(Vehicalref.current, {
        transform: "translateY(100%)",
      })
      gsap.to(VehicalClose.current, {
        hidden:true
      })
    }
  },[VehicalPanel])

  useGSAP(function()
  {
    if(confirmVehical)
    {
      gsap.to(Confirmref.current, {
        transform: "translateY(0%)",

      })
      gsap.to(ConfirmClose.current, {
        hidden: false,
      })
    }
    else
    {
      gsap.to(Confirmref.current, {
        transform: "translateY(100%)",
      })
      gsap.to(ConfirmClose.current, {
        hidden:true
      })
    }
  },[confirmVehical])

  useGSAP(function()
  {
    if(lookingForDriver)
    {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(0%)",

      })
      gsap.to(lookingForDriverClose.current, {
        hidden: false,
      })
    }
    else
    {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(100%)",
      })
      gsap.to(lookingForDriverClose.current, {
        hidden:true
      })
    }
  },[lookingForDriver])

  useGSAP(function()
  {
    if(waitingForDriver)
    {
      gsap.to(WaitingRef.current, {
        transform: "translateY(0%)",

      })
      gsap.to(WaitingClose.current, {
        hidden: false,
      })
    }
    else
    {
      gsap.to(WaitingRef.current, {
        transform: "translateY(100%)",
      })
      gsap.to(WaitingClose.current, {
        hidden:true
      })
    }
  },[waitingForDriver])


  return (
    <div className='relative h-screen'> 
     <img className='w-20 ml-5 pt-5 absolute' src="https://logohistory.net/wp-content/uploads/2023/06/Uber-Logo.png" alt="" />
      <div className='w-screen h-screen'>
        <img className='w-full h-full object-cover' src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt=""/>
        <h5  onClick={()=>setVehicalPanel(false)} className='absolute bottom-117 z-20 right-6 text-2xl'>
       <i ref={VehicalClose} className="ri-close-large-line"></i>
       </h5>
      </div>

      <div className='flex flex-col justify-end  absolute top-0 w-full h-screen'>
      
       <div className='h-[25%] p-5 bg-white'>
       <h5  onClick={()=>setpanelOpen(false)} className='absolute top-6 right-6 text-2xl'>
       <i ref={panelClose} className="ri-close-large-line"></i>
       </h5>
       <h4 className='text-3xl font-bold '>Find a trip</h4>
        <form className='flex flex-col mt-5' onSubmit={(e)=>{
          submitHandler(e)
          }}>
            {/* <div className="line absolute h-16 w-1 bottom-0 -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div> */}
          <input
          onClick={()=>setpanelOpen(true)} 
          value={pickup}
          onChange={(e)=>setpickup(e.target.value)}
          className='mb-4 bg-[#eeeeee] px-12 py-2 text-lg rounded-lg' type="text" placeholder='Enter your pickup location' />
          <input
          onClick={()=>setpanelOpen(true)} 
          value={Destination}
          onChange={(e)=>setDestination(e.target.value)}
          className='mb-4 bg-[#eeeeee] px-12 py-2 text-lg rounded-lg' type="text" placeholder='Enter your destination' />
        </form>
       </div>
       <div ref={panelRef} className='display-none bg-white'>
        <LocationSearchPanel setpanelOpen={setpanelOpen} setValue={setVehicalPanel}/>
       </div>
      </div>

      {/* cab booking panel */}


      <div ref={Vehicalref}  className='flex flex-col w-full px-3 py-4 fixed z-10 translate-y-full bottom-0 bg-white'> 
           <CabBooking setconfirmVehical={setconfirmVehical} setVehicalPanel={setVehicalPanel} />
      </div>

      {/* confirm ride panel */}

      <div ref={Confirmref} className='flex flex-col w-full px-3 py-4 fixed z-10 translate-y-full bottom-0 bg-white'> 
           <ConfirmRide ConfirmClose={ConfirmClose} setconfirmVehical={setconfirmVehical} setVehicalPanel={setVehicalPanel} setLookingForDriver={setLookingForDriver} />
      </div>

      <div onClick={()=>
      {setwaitingForDriver(true)
        setLookingForDriver(false)
      }
      } ref={lookingForDriverRef} className='flex flex-col w-full px-3 py-4 fixed z-10 translate-y-full bottom-0 bg-white'> 
           <LookingForDriver LookingForDriverClose={lookingForDriverClose} setconfirmVehical={setconfirmVehical}  setLookingForDriver={setLookingForDriver} />
      </div>

      <div ref={WaitingRef} className='flex flex-col w-full px-3 py-4 fixed z-10 translate-y-full bottom-0 bg-white'> 
           <WaitingForDriver setwaitingForDriver={setwaitingForDriver} setLookingForDriver={setLookingForDriver}  WaitingClose={WaitingClose} />
      </div>

    </div>
  )
}

export default Home