import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div className='flex flex-col h-142'>
    <h3 className='text-[22px] font-bold mb-2'>Looking for nearby vehicles</h3>
       <h5 ref={props.LookingForDriverClose}
        className='absolute bottom-137 z-30 right-6 text-2xl'>
       <i   onClick={
        () => {
          props.setLookingForDriver(false)
        }}  className="ri-close-large-line"></i>
       </h5>
        
        <div className=' flex items-center justify-between mt-6 border-b-3  border-b-gray-300 flex-row bg-white p-2 h-40'>
          <img className='w-full h-full object-contain rounded-2xl' src="../Asssets/1.png" alt="" />
        </div>

        <div className='flex items-center justify-between flex-col  p-2'>
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

export default LookingForDriver