import React from 'react'
import { useState } from 'react'

const ConfirmRide = (props) => {
 
  function payment() {
    if (props.vehicleType === 'car') {
      return props.fare.car;
    } else if (props.vehicleType === 'auto') {
      return props.fare.auto;
    } else if (props.vehicleType === 'moto') {
      return props.fare.moto;
    }
  } 
  
  function image() {
    if (props.vehicleType === 'car') {
      return <img className='w-full h-full object-contain rounded-2xl' src="../Asssets/1.png" alt="" />;
    } else if (props.vehicleType === 'auto') {
      return <img className='w-full h-full object-contain rounded-2xl' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />;
    } else if (props.vehicleType === 'moto') {
      return <img className='w-full h-full object-contain rounded-2xl' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />;
    }
  }

  return (
    <div className='flex flex-col h-142'>
    <h3 className='text-[22px] font-bold mb-2'>Confirm Your Ride</h3>
       <h5 ref={props.ConfirmClose}
        className='absolute bottom-137 z-30 right-6 text-2xl'>
       <i   onClick={
        () => {
          props.setconfirmVehical(false)
        }}  className="ri-close-line"></i>
       </h5>
        
        <div className=' flex items-center justify-between mt-6 border-b-3  border-b-gray-300 flex-row bg-white p-2 h-40'>
          {image()}
        </div>

        <div className='flex items-center justify-between flex-col  p-2'>
        <div className='flex flex-row justify-between items-center border-b-3 border-b-gray-300  h-20 w-full'>
              <h5 className='text-2xl font-semibold items-center justify-center flex'><i className="ri-route-line"></i></h5>
              <div className='flex flex-col items-start ml-4 mt-3  h-20 w-full'>
              <h3 className='text-2xl font-bold'>{props.pickup}</h3>
              <h4 className='text-base font-semibold'>opp. Nisarg Hostel , Anand</h4>
              </div>
          </div>
          <div className='flex flex-row justify-between items-center border-b-3 border-b-gray-300  h-20 w-full'>
              <h5 className='text-2xl font-semibold items-center justify-center flex'><i className="ri-route-line"></i></h5>
              <div className='flex flex-col items-start ml-4 mt-4  h-20 w-full'>
              <h3 className='text-2xl font-bold'>{props.destination}</h3>
              <h4 className='text-base font-semibold'>opp. Nisarg Hostel , Anand</h4>
              </div>
          </div>
          <div className='flex flex-row justify-between items-center border-b-3 border-b-gray-300  h-20 w-full'>
              <h5 className=' text-2xl font-semibold items-center justify-center flex'><i className="ri-bank-card-fill"></i></h5>
              <div className='flex flex-col items-start ml-4 mt-4 h-20 w-full'>
              <h3 className='text-2xl font-bold'>₹ {payment()}</h3>
              <h4 className='text-base font-semibold'>Cash / Card / UPI</h4>
              </div>
          </div>
          <button onClick={()=>{
            props.createRide()
          }} className='text-white bg-green-600 rounded-2xl p-3 w-full mt-6'>Confirm Ride</button>
        </div>
        </div>
        )
}

export default ConfirmRide