import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')
    const navigate = useNavigate();

    const {captain,setCaptain} = useContext(CaptainDataContext);

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const captain=(
        {   
          fullname:
           {
            firstname:firstName,
            lastname:lastName        
           },
            email:email,
            password:password,
            vehicle:
            {
              color:vehicleColor,
              Plate:vehiclePlate,
              capacity:vehicleCapacity,
              vehicleType:vehicleType
            }
        }
      )
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captain);
      if(response.status===201)
      {
        const data=response.data;
        setCaptain(data.captain);
        localStorage.setItem('token',data.token);
        navigate('/captain-Home');
      }
    setemail('')
    setfirstName('')
    setlastName('')
    setpassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
    }
  
    return (
      <div className='flex justify-between flex-col h-screen'>
      <div className='flex flex-col'>
       <img className='w-25 ml-7 pt-8' src="data:image/png;base64,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" alt="" />
      <form onSubmit={handleSubmit} className='p-7 flex flex-col'  >
          <h3 className='mb-3 text-xl font-medium'>What's your Name ?</h3>
          <div className='flex justify-between gap-4'>
          <input
          value={firstName}
          onChange={(e)=>setfirstName(e.target.value)}
          className='bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='First Name' required />
          <input 
          value={lastName}
          onChange={(e)=>setlastName(e.target.value)}
          className='bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Last Name'/>
          </div>
          <h3 className='mb-3 text-xl font-medium'>What's your Email ?</h3>
          <input
          value={email}
          onChange={(e)=>setemail(e.target.value)}
           className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base' type="email" placeholder='email@example.com' required />
          <h3 className='mb-3 text-xl font-medium'>Enter Password</h3>
          <input
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base'  type="password" placeholder='********' required/>
           <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Auto">Auto</option>
              <option value="Motorcycle">Motor Bike</option>
            </select>
          </div>
          <button className='bg-[#000000] text-white py-2 rounded text-lg text-semibold mt-3 mb-5'>Create Account</button>
         <p className='text-sm'>Already have an account? <Link to="/captain-login" className='text-gray-500'>Login here</Link></p>     
      </form>
      </div>
  </div>
    )
}

export default CaptainSignup