import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { DoctorProvider } from './DoctorDashContext'
import { Container } from 'react-bootstrap'

const DoctorDashBoard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(! sessionStorage.getItem("Doctor")){
            navigate("/login")
          }
    },[])
    
  return (

    <>
    {sessionStorage.getItem("Doctor") &&   <DoctorProvider><Container>  <Outlet/> </Container></DoctorProvider>}
    </>
  )
}

export default DoctorDashBoard