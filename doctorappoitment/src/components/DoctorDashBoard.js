import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { DoctorProvider } from './DoctorDashContext'

const DoctorDashBoard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(! sessionStorage.getItem("Doctor")){
            navigate("/login")
          }
    },[])
    
  return (

    <>
    {sessionStorage.getItem("Doctor") &&   <DoctorProvider>  <Outlet/> </DoctorProvider>}
    </>
  )
}

export default DoctorDashBoard