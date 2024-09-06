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



  }, []);

useEffect(()=>{
if(doctorsBookData)
{
  console.log(doctorsBookData)
}


},[doctorsBookData])


  return (
    <div className="doctor-list-container">
      {doctorsBookData ? "hii" :"no"}
      {doctorsBookData ? (
        <div key={doctorsBookData.doctorId} className="doctor-card">
          <div className="doctor-header">
            <img
              src={`data:image/jpeg;base64,${doctorsBookData.imageData}`}
              alt={doctorsBookData.name}
              className="doctor-image"
            />
            <div className="doctor-details">
              <h3>{doctorsBookData.name}</h3>
              <p>{doctorsBookData.specialization}</p>
            </div>
          </div>

          <div className="booking-list">
            {doctorsBookData ? (
              doctorsBookData.bookings["$values"].map((booking) => (
                <div key={booking.bookingId} className="booking-card">
                  <h4>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</h4>
                  <p>Status: {booking.status}</p>
                  <p>Patient: {booking.patientName}</p>
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