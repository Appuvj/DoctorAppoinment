import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PatientAdminView = () => {

    const {id} = useParams()

    const [patientsBookData,setPatientsBookData] = useState([])

    useEffect(()=>{
axios.get(`https://localhost:7146/api/Patient/${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err))
    },[])


  return (
    <div>PatientAdminView</div>
  )
}

export default PatientAdminView