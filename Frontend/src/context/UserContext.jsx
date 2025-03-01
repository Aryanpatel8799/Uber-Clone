import React from 'react'
import { createContext,useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {
    const [user,setuser] = useState(null);
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(null);
     
    const value={
        user,
        setuser,
        loading,
        setloading,
        error,
        seterror
    }
  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext