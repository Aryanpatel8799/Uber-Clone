import React from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import { useState} from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import { useContext } from 'react'

const UserSignup = () => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({})
  const {user,setUser} = useContext(UserDataContext);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const newUser = {
      fullname:
      {
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser);
    if(response.status===201)
    {
      setUser(response.data.user);
      localStorage.setItem('token',data.token);
      navigate('/home');
    }
    setemail('')
    setpassword('')
    setfirstName('')
    setlastName('')
  }

  return (
    <div className='flex justify-between flex-col h-screen'>
    <div className='flex flex-col'>
     <img className='w-25 ml-7 pt-8' src="https://logohistory.net/wp-content/uploads/2023/06/Uber-Logo.png" alt="" />
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
        <button className='bg-[#000000] text-white py-2 rounded text-lg text-semibold mt-3 mb-5'>Create Account</button>
       <p className='text-sm'>Already have an account? <Link to="/login" className='text-gray-500'>Login here</Link></p>     
    </form>
    </div>
</div>
  )
}

export default UserSignup