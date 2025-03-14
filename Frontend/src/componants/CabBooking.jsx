import React from 'react'

const CabBooking = (props) => {
  return (
    <>

    <h3 ref={props.VehicalClose} className='text-2xl font-bold mb-2'>Choose a Vehicle</h3>

      <div onClick={()=>
      {
        props.setconfirmVehical(true)
        props.setVehicalPanel(false)
        props.setvehicleType('car')
      }} className='flex items-center justify-between mt-3 border-3 active:border-black border-gray-300 flex-row p-2 h-30 rounded-xl mb-4'>
       <div className='mr-2 flex flex-row h-20 w-25'><img className='w-full h-full object-contain rounded-2xl' src="../Asssets/1.png" alt=""/></div> 
       {/* cardetail */}
       <div className='flex flex-col justify-between items-start  h-20 w-40'>
        <h4 className='text-2xl font-semibold'>UberGo <span className='text-xl font-semibold '><i className="text-xl ri-user-fill mr-1"></i>4</span></h4>
        <span className='flex flex-row'>
        <h4 className='text-base font-semibold'>10 mins away</h4>
        <h4 className='text-[10px] font-extralight text-gray-700 items-center justify-center flex mt-0.5 mr-1 ml-1'><i className="ri-circle-fill"></i></h4>
        <h4 className='text-base font-semibold'>4.5km</h4></span>
        <h4 className='flex flex-row'><span className='text-sm font-extralight text-gray-700 items-center justify-center flex mt-0.5 mr-1'><i className="ri-star-fill"></i></span>4.5</h4>
        </div>
        {/* pricing */}
        <div className='flex flex-col justify-center items-center h-17 w-17 '>
        <h4 className='text-[22px]  font-semibold text-gray-700'>₹ {props.fare.car}</h4>
        </div>
        </div>

        <div  onClick={()=>
      {
        props.setconfirmVehical(true)
        props.setVehicalPanel(false)
        props.setvehicleType('auto')
      }}  className='flex items-center justify-between mt-3 border-3 active:border-black border-gray-300 flex-row  p-2 h-30 rounded-xl mb-4'>
       <div className='mr-2 flex flex-row h-20 w-25'><img className='w-full h-full object-contain rounded-2xl' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt=""/></div> 
       {/* cardetail */}
       <div className='flex flex-col justify-between items-start  h-20 w-40'>
        <h4 className='text-2xl font-semibold'>UberAuto <span className='text-xl font-semibold '><i className="text-xl ri-user-fill mr-1"></i>3</span></h4>
        <span className='flex flex-row'>
        <h4 className='text-base font-semibold'>5 mins away</h4>
        <h4 className='text-[10px] font-extralight text-gray-700 items-center justify-center flex mt-0.5 mr-1 ml-1'><i className="ri-circle-fill"></i></h4>
        <h4 className='text-base font-semibold'>4.5km</h4></span>
        <h4 className='flex flex-row'><span className='text-sm font-extralight text-gray-700 items-center justify-center flex mt-0.5 mr-1'><i className="ri-star-fill"></i></span>4.5</h4>
        </div>
        {/* pricing */}
        <div className='flex flex-col justify-center items-center h-17 w-17 '>
        <h4 className='text-[22px] font-semibold text-gray-700'>₹ {props.fare.auto}</h4>
        </div>
        </div>

        <div onClick={()=>
      {
        props.setconfirmVehical(true)
      props.setVehicalPanel(false)
      props.setvehicleType('moto')
      }}  className='flex items-center justify-between mt-3 border-3 active:border-black border-gray-300 flex-row  p-2 h-30 rounded-xl mb-4'>
       <div className='mr-2 flex flex-row h-20 w-25'><img className='w-full h-full object-contain rounded-2xl' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt=""/></div> 
       {/* cardetail */}
       <div className='flex flex-col justify-between items-start  h-20 w-40'>
        <h4 className='text-2xl font-semibold'>UberMoto <span className='text-xl font-semibold '><i className="text-xl ri-user-fill mr-1"></i>1</span></h4>
        <span className='flex flex-row'>
        <h4 className='text-base font-semibold'>5 mins away</h4>
        <h4 className='text-[10px] font-extralight text-gray-700 items-center justify-center flex mt-0.5 mr-1 ml-1'><i className="ri-circle-fill"></i></h4>
        <h4 className='text-base font-semibold'>4.5km</h4></span>
        <h4 className='flex flex-row'><span className='text-sm font-extralight text-gray-700 items-center justify-center flex mt-0.5 mr-1'><i className="ri-star-fill"></i></span>4.5</h4>
        </div>
        {/* pricing */}
        <div className='flex flex-col justify-center items-center h-17 w-17 '>
        <h4 className='text-[22px] font-semibold text-gray-700'>₹ {props.fare.moto}</h4>
        </div>
        </div>
    </>
  )
}

export default CabBooking