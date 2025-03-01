import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState} from 'react';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserprotectedWrapper = ({children}) => {
   const token = localStorage.getItem('token');
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const {user,setuser} = useContext(UserDataContext);
    useEffect(() => {
        if (!token) {
          navigate('/login');
        }
    

    axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
         setuser(response.data.user);
         setloading(false);
      }
    }).catch((err) => {
      console.log(err);
      localStorage.removeItem('token');
      navigate('/login');
    });

    if(loading){ 
      return <div>Loading...</div>;
    }
  }, [token]);
  return (
    <>{children}</>
  )
}

export default UserprotectedWrapper