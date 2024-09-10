import React, { useContext, useEffect, useState } from 'react'
import { PatientContext, PatientProvider } from './PatientDashContext'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Button } from '@mui/material';
import { Home, EventNote, Search, History, Edit, Logout } from '@mui/icons-material';
const PatientDashBoard = () => {
   
    const navigate = useNavigate()

    useEffect(()=>{
        if(! sessionStorage.getItem("Patient")){
            navigate("/login")
          }
    },[])
    return (
       
    <>
    {sessionStorage.getItem("Patient") &&   <PatientProvider>
        
      
        
          <Outlet/> </PatientProvider>}
    </>
    )
}

export default PatientDashBoard
