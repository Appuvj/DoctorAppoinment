import React from 'react'
import { PatientProvider } from './PatientDashContext'
import { Outlet } from 'react-router-dom'

const PatientDashBoard = () => {
    return (
        <PatientProvider>
       <Outlet/>
    </PatientProvider>
    )
}

export default PatientDashBoard
