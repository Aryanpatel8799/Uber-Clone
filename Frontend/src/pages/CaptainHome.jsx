import React from 'react'
import { Link } from 'react-router-dom'
import RidePopup from '../componants/RidePopup'
import { useState,useRef } from 'react'
import {useGSAP} from "@gsap/react";
import { gsap } from "gsap";
import ConfirmRidePopUp from '../componants/ConfirmRidePopUp'
import CaptainDetails from '../componants/CaptainDetails'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'
import { SocketContext } from '../context/socketContext'
import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../componants/LiveTracking';

const CaptainHome = () => {

    const [Ridepopuppanel, setRidepopuppanel] = useState(false)
    const RidepopupRef=useRef();
    const RidepopupClose=useRef();
    const [RideData, setRideData] = useState({})
    const [ConfirmRidepopuppanel, setConfirmRidepopuppanel] = useState(false)
    const ConfirmRidepopupRef=useRef();
    const ConfirmRidepopupClose=useRef();
    const { captain } = useContext(CaptainDataContext)
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate();
    
    useEffect(() => {
      socket.emit('join', {
          userId: captain._id,
          userType: 'captain'
      })
      const updateLocation = () => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(position => {
              
                socket.emit('update-location-captain', {
                      userId: captain._id,
                      location: {
                          ltd: position.coords.latitude,
                          lng: position.coords.longitude
                      }
                  })
              })
          }
      }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()
  }, [])

  socket.on('new-ride', (data) => {
    console.log('Received new-ride event:', data);
    setRideData(data);
    setRidepopuppanel(true);
  });
  
    async function confirmRide()
    {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        userId: captain._id,
        rideId: RideData._id


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    setRidepopuppanel(false)
    setConfirmRidepopuppanel(true)
    }
    
  
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
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
    </div>
    <div className='h-140'>
      <LiveTracking />
    </div>
    <div className='p-6'>
        <CaptainDetails />
    </div>
    <div ref={RidepopupRef} className='flex flex-col w-full px-3 py-4 fixed  z-10 bottom-0 bg-white'> 
           <RidePopup RideData={RideData} confirmRide={confirmRide}  RidepopupClose={RidepopupClose} setRidepopuppanel={setRidepopuppanel} setConfirmRidepopuppanel={setConfirmRidepopuppanel} />
    </div>
    <div ref={ConfirmRidepopupRef} className='flex flex-col w-full px-3 py-4 fixed  z-10 bottom-0 bg-white'> 
           <ConfirmRidePopUp RideData={RideData} ConfirmRidepopupClose={ConfirmRidepopupClose} setRidepopuppanel={setRidepopuppanel} setConfirmRidepopuppanel={setConfirmRidepopuppanel} />
    </div>
</div>
  )
}

export default CaptainHome