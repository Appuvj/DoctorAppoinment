import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AdminContext } from './AdminDashContext';
import './doctoradminview.css'
const DoctorAdminView = () => {
  const { doctors, appointments, fetchDatas } = useContext(AdminContext);
  const { id } = useParams();

  const [doctorsBookData, setDoctorsBookData] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

const getById = async () => {

 const response = await axios.get(`https://localhost:7146/api/Doctor/${id}`)

 setDoctorsBookData(response.data)


}


  useEffect(() => {


    getById()


  },[id]);

useEffect(()=>{
if(doctorsBookData)
{
  console.log(doctorsBookData)
}


},[doctorsBookData])


  return (
    <div className="doctor-list-container">
    {doctorsBookData ? (
      <div key={doctorsBookData.doctorId} className="doctor-card card">
        <div className="doctor-header">
          <img
            src={`data:image/jpeg;base64,${doctorsBookData.imageData}`}
            alt={doctorsBookData.name}
            className="doctor-image"
          />
          <div className="doctor-details">
            <h3>{doctorsBookData.name}</h3>
            <p><strong>Specialization:</strong> {doctorsBookData.specialization}</p>
          </div>
        </div>
  
        <div className="booking-list">
          {doctorsBookData.bookings["$values"].length > 0 ? (
            doctorsBookData.bookings["$values"].map((booking) => (
              <div key={booking.bookingId} className="booking-card">
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Patient:</strong> {booking.patientName ? booking.patientName : "record deleted"}</p>
              </div>
            ))
          ) : (
            <p>No bookings available</p>
          )}
        </div>
      </div>
    ) : (
      <h1>Loading..</h1>
    )}
  </div>
  
  );
}

export default DoctorAdminView