import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./patientadminview.css"
const PatientAdminView = () => {

    const {id} = useParams()

    const [patientsBookData,setPatientsBookData] = useState([])

    const GetById = async () => {
      axios.get(`https://localhost:7146/api/Patient/${id}`).then((res)=>setPatientsBookData(res.data)).catch((err)=>console.log(err))


    }



    useEffect(()=>{
      GetById()

    },[])

    if (!patientsBookData) {
      return <div>Loading...</div>
    }
  
    const { name, email, contact, address, gender, image, bookings } = patientsBookData
  
    return (
      <div className="patient-admin-view">
      {/* Patient Details Card */}
      <div className="patient-card card">
        {image ? <img 
          src={`data:image/jpeg;base64,${image}`} 
          alt={name} 
          className="profile-picture" 
        /> : ""}
        
        <div className="patient-info">
          <h2>{name}</h2>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Contact:</strong> {contact}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Gender:</strong> {gender}</p>
        </div>
      </div>

      {/* Booking Details Card */}
      <div className="booking-card card">
        <h3>Bookings</h3>
        {bookings?.$values.length > 0 ? (
          bookings.$values.map((booking) => (
            <div key={booking.bookingId} className="booking-item">
              <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Doctor:</strong> {booking.doctorName ? booking.doctorName : "record deleted"}</p>
            </div>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </div>
    </div>
    )
}

export default PatientAdminView