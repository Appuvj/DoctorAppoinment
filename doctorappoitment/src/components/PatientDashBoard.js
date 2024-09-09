import React, { useEffect } from 'react'
import { PatientProvider } from './PatientDashContext'
import { Outlet, useNavigate } from 'react-router-dom'

const PatientDashBoard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(! sessionStorage.getItem("Patient")){
            navigate("/login")
          }
    },[])
    return (
       
    <>
    {sessionStorage.getItem("Patient") &&   <PatientProvider>  <Outlet/> </PatientProvider>}
    </>
    )
}

export default PatientDashBoard
