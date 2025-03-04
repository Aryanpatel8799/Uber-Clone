import React from 'react'

const LocationSearchPanel = (props) => {

    const locationArray=[
        {
            name:"Hotel Matel",
            address:"Vadnagar road ,visnagar",
        },
        {
            name:"Hotel pune",
            address:"Vadnagar road ,visnagar",
        },
        {
            name:"Hotel china",
            address:"Vadnagar road ,visnagar",
        },
    ]

    const locationDisplay=locationArray.map((location,index)=><div key={index} className='flex items-center justify-start flex-row bg-white border-3 border-[#eeeeee] active:border-black p-2 rounded-xl mb-4'>
    <div className='mr-2 flex flex-row'><h2 className='bg-[#eeeeee] p-2 rounded-xl text-2xl mr-2'><i className="ri-taxi-fill"></i></h2></div> 
    <div className='flex flex-col'>
     <h4 className='text-xl font-bold mb-1'>{location.name}</h4>
     <h4 className='text-lg font-semibold'>{location.address}</h4>
     </div>
</div>)
  return (
<div onClick={() => {
    props.setValue(true);
    props.setpanelOpen(false);
}} className='flex flex-col p-4'>

    
    {locationDisplay}

</div>
  )
}

export default LocationSearchPanel