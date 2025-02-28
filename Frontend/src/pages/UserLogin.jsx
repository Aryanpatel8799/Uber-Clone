import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [userData, setuserData] = useState({})

 const handleSubmit=(e)=>{
  e.preventDefault();
  setuserData(
    { 
        email:email,
        password:password
    })
    console.log(userData);
  setemail('');
  setpassword('');
 }

  return (
    <div className='flex justify-between flex-col h-screen'>
        <div className='flex flex-col'>
         <img className='w-25 ml-7 pt-8' src="https://logohistory.net/wp-content/uploads/2023/06/Uber-Logo.png" alt="" />
        <form className='p-7 flex flex-col' onSubmit={handleSubmit} >
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
            <button className='bg-[#000000] text-white py-2 rounded text-lg text-semibold mt-3 mb-5'>Login</button>
           <p className='text-sm'>New to Uber? <Link to="/signup" className='text-gray-500'>Create new Account</Link></p>     
        </form>
        </div>
        <div className='flex flex-col items-center mb-25'>
           <Link to="/captain-login"><button className='bg-[#58dc0b] text-white py-2 rounded text-lg w-80 text-semibold mt-5'>Sign in as Captain</button></Link>
        </div>
    </div>
  )
}

export default UserLogin