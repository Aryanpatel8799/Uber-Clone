import React, { use, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../componants/LocationSearchPanel';
import ConfirmRide from '../componants/ConfirmRide';
import CabBooking from '../componants/CabBooking';
import LookingForDriver from '../componants/LookingForDriver';
import WaitingForDriver from '../componants/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/socketContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../componants/LiveTracking';

const Home = () => {
  const [pickup, setpickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setpanelOpen] = useState(false);
  const [VehicalPanel, setVehicalPanel] = useState(false);
  const [confirmVehical, setconfirmVehical] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [pickupSuggestion, setpickupSuggestion] = useState([]);
  const [destinationSuggestion, setdestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setfare] = useState({})
  const [vehicleType, setvehicleType] = useState('')
  const [vehicleFound, setvehicleFound] = useState(false)
  const [rideData, setrideData] = useState({})
  const panelRef = useRef(null);
  const panelClose = useRef(null);
  const Vehicalref = useRef(null);
  const VehicalClose = useRef(null);
  const Confirmref = useRef(null);
  const ConfirmClose = useRef(null);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const lookingForDriverRef = useRef(null);
  const lookingForDriverClose = useRef(null);
  const WaitingRef = useRef(null);
  const WaitingClose = useRef(null);
  const navigate = useNavigate();


  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
      
    socket.emit("join", { userType: "user", userId: user._id })
}, [ user ])

useEffect(() => {
  socket.on('ride-confirmed', ride => {
    console.log("ride");
    setwaitingForDriver(true);
    setLookingForDriver(false);
    setvehicleFound(false);
    setrideData(ride);
  });

  return () => {
    socket.off('ride-confirmed');
  };
}, [socket]);

socket.on('ride-started', ride => {
  setwaitingForDriver(false)
  setLookingForDriver(false)
  navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
})


    
    async function findTripHandler() {
      if (pickup && destination) {
        setpanelOpen(false);
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: {
            origin: pickup,
            destination: destination
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setfare(response.data);
        setVehicalPanel(true);
      } catch (err) {
        console.log(err);
      }
    }
    
    async function createRide() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
          origin: pickup,
          destination: destination,
          vehicleType: vehicleType
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.status === 201) {
          console.log("response",response.data);
          setvehicleType(vehicleType);  
          setconfirmVehical(false)
          setLookingForDriver(true)

        } else {
          console.log('error');
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    

   

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setpickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion?input=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setpickupSuggestion(response.data|| []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion?input=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setdestinationSuggestion(response.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useGSAP(function () {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: "70%",
        display:"block",
        animation:"ease-in"
      })
      gsap.to(panelClose.current, {
        hidden: false,
      })
      document.body.style.overflow = 'hidden'; // Prevent scrolling
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
      document.body.style.overflow = 'auto'; // Allow scrolling
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
    <div className='h-screen  relative overflow-hidden'>
      <div className='h-screen w-screen'>
      <LiveTracking />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white'>
          <h5 onClick={() => setpanelOpen(false)} className='absolute top-6 right-6 text-2xl'>
            <i ref={panelClose} className="ri-close-large-line"></i>
          </h5>
          <h4 className='text-3xl font-bold '>Find a trip</h4>
          <form className='flex flex-col mt-5' onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input
              onClick={() => (
                setpanelOpen(true),
                setActiveField('pickup'))}
              value={pickup}
              onChange={handlePickupChange}
              className='mb-4 bg-[#eeeeee] px-12 py-2 text-lg rounded-lg' type="text" placeholder='Enter your pickup location' />
            <input
              onClick={() => (
                setpanelOpen(true),
                setActiveField('destination'))}
              value={destination}
              onChange={handleDestinationChange}
              className='mb-4 bg-[#eeeeee] px-12 py-2 text-lg rounded-lg' type="text" placeholder='Enter your destination' />
            <button
              type="button"
              onClick={
                findTripHandler}
            
              className='bg-blue-500 text-white py-2 rounded-lg'>
              Find a ride
            </button>
          </form>
        </div>
        <div ref={panelRef} className=' bg-white'>
          <LocationSearchPanel
            setDestination={setDestination}
            setPickup={setpickup}
            activeField={activeField}
            suggestions={activeField === 'pickup' ? pickupSuggestion : destinationSuggestion}
            setPanelOpen={setpanelOpen} />
        </div>
      </div>

      {/* cab booking panel */}
      <div ref={Vehicalref} className='flex flex-col w-full px-3 py-4 fixed z-10 translate-y-full bottom-0 bg-white'>
        <CabBooking setvehicleType={setvehicleType} createRide={createRide} fare={fare} VehicalClose={VehicalClose} setconfirmVehical={setconfirmVehical} setVehicalPanel={setVehicalPanel} />
      </div>

      {/* confirm ride panel */}
      <div ref={Confirmref} className='flex flex-col w-full px-3 py-4 fixed translate-y-full bottom-0 bg-white'>
        <ConfirmRide createRide={createRide} fare={fare} vehicleType={vehicleType}  pickup={pickup} destination={destination} ConfirmClose={ConfirmClose} setconfirmVehical={setconfirmVehical} setVehicalPanel={setVehicalPanel} setLookingForDriver={setLookingForDriver} />
      </div>

      <div ref={lookingForDriverRef} className='flex flex-col w-full px-3 py-4 fixed  translate-y-full bottom-0 bg-white'>
        <LookingForDriver fare={fare} vehicleType={vehicleType}  pickup={pickup} destination={destination} LookingForDriverClose={lookingForDriverClose} setconfirmVehical={setconfirmVehical} setLookingForDriver={setLookingForDriver} />
      </div>

      <div ref={WaitingRef} className='flex flex-col w-full px-3 py-4 fixed translate-y-full bottom-0 bg-white'>
        <WaitingForDriver rideData={rideData} setwaitingForDriver={setwaitingForDriver} setLookingForDriver={setLookingForDriver} WaitingClose={WaitingClose} />
      </div>
    </div>
  )
}

export default Home;