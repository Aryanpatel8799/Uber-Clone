/* eslint-disable no-unused-vars */
import './App.css'
import { Route, Routes } from 'react-router-dom'
import GettingStarted from './pages/GettingStarted'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { useContext, } from 'react'
import { UserDataContext } from './context/UserContext'
import Home from './pages/Home'
import UserprotectedWrapper from './pages/userprotectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding'

function App() {
  
  
  return (
    <>
      <Routes>
        <Route path='/' element={<GettingStarted />} />
        <Route path='/home' 
        element={
          <UserprotectedWrapper>
            <Home />
            </UserprotectedWrapper>
            }
          />
        <Route path='/logout' element={
          <UserprotectedWrapper>
          <UserLogout />
          </UserprotectedWrapper>
        } />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignup/>} />

        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />
        <Route path='/captain-Home' element={
          <CaptainProtectedWrapper>
          <CaptainHome />
          </CaptainProtectedWrapper>
          } />
          <Route path='/captain-logout' element={
            <CaptainProtectedWrapper>
            <CaptainLogout />
            </CaptainProtectedWrapper>
          } />
      </Routes>
    </>
  )
}

export default App
