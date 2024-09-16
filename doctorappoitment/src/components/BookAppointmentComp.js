import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./bookappointment.css";
import { PatientContext } from './PatientDashContext';
import { Button, TextField, Typography, Box, Grid, Container } from "@mui/material";
import DbService from '../Api/DbService';
import { useNavigate } from 'react-router-dom';

const BookAppointmentComp = () => {
  const [doctor, setDoctor] = useState();
  const [patient, setPatient] = useState();
  const { patients, selectedDoctor, fetchDatas, fetchDoctors } = useContext(PatientContext);
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [minTime, setMinTime] = useState('');

  const today = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

  // Function to get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  const currentTime = getCurrentTime(); // Get current time

  useEffect(() => {
    setDoctor(selectedDoctor);
  }, [selectedDoctor]);

  useEffect(() => {
    // Update minTime based on selected date
    if (date === today) {
      setMinTime(currentTime);
    } else {
      setMinTime('00:00'); // No restriction for dates other than today
    }
  }, [date, currentTime, today]);

  const validateForm = () => {
    const newErrors = {};
    if (!date) newErrors.date = 'Please select a date.';
    if (!time) newErrors.time = 'Please select a time.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      if (window.confirm("Booking Request Sent To Admin")) {
        setDate('');
        setTime('');
        setPatientName('');
        setEmail('');
        setMessage('');
        setErrors({});

        const combinedDateTime = new Date(`${date}T${time}:00`);
        const formattedDateTime = combinedDateTime.toISOString();
        const response = await DbService.post("Bookings", {
          "bookingDate": formattedDateTime,
          "status": "Pending",
          "doctorId": doctor.id,
          "patientId": patients.patientId,
          "message": message
        }, {}, sessionStorage.getItem("token"));

        if (response.status === 201) {
          await fetchDatas();
          await fetchDoctors();
          setTimeout(() => {
            navigate("/patient-dash/patient-bookings");
          }, 1000);
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container maxWidth="sm" className="book-appointment">
      <Box className="appointment-container" sx={{ bgcolor: '#f7f7f7', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Book an Appointment
        </Typography>

        {doctor && (
          <Box className="doctor-info" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <img
              src={`data:image/jpg;base64,${doctor.image}`}
              alt={doctor.name}
              className="doctor-image"
              style={{ width: 100, height: 100, borderRadius: '50%', marginRight: 15 }}
            />
            <Typography variant="h6">{doctor.name}</Typography>
          </Box>
        )}

        <Box component="form" className="appointment-form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label=""
                type="date"
                value={date}
                InputProps={{ inputProps: { min: today } }}
                onChange={(e) => setDate(e.target.value)}
                error={Boolean(errors.date)}
                helperText={errors.date}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label=""
                type="time"
                value={time}
                InputProps={{ inputProps: { min: minTime } }} // Set min time to minTime
                onChange={(e) => setTime(e.target.value)}
                error={Boolean(errors.time)}
                helperText={errors.time}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={patients ? patients.name : ""}
                InputProps={{ readOnly: true }}
                error={Boolean(errors.patientName)}
                helperText={errors.patientName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={patients ? patients.email : ""}
                InputProps={{ readOnly: true }}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Message"
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Book Appointment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default BookAppointmentComp;

