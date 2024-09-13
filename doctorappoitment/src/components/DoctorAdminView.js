import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AdminContext } from './AdminDashContext';
import './doctoradminview.css'
import DbService from '../Api/DbService';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DoctorAdminView = () => {
  const { doctors, appointments, fetchDatas } = useContext(AdminContext);
  const { id } = useParams();

  const [doctorsBookData, setDoctorsBookData] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

const getById = async () => {

 const response = await DbService.get(`Doctor/${id}`,{},sessionStorage.getItem("token"))

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
    <div className="">
    {doctorsBookData ? (
      <div key={doctorsBookData.doctorId} className="">
         <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        boxShadow: 4, // Increased shadow for depth
        borderRadius: 3, // Rounded corners
        maxWidth: 500,
        margin: '20px auto', // Added margin for spacing between cards
        backgroundColor: '#f9f9f9', // Light background color for contrast
        transition: 'transform 0.3s', // Add hover effect
        '&:hover': {
          transform: 'scale(1.05)', // Slight scale-up on hover
        },
      }}
    >
      {/* Profile Image */}
      <CardMedia
        component="img"
        sx={{
          width: 120, // Larger profile image
          height: 120,
          borderRadius: '50%',
          marginRight: 2,
          border: '3px solid #1976d2', // Border around image for style
        }}
        image={`data:image/jpeg;base64,${doctorsBookData.imageData}`}
        alt={doctorsBookData.name}
      />

      {/* Doctor Details */}
      <CardContent sx={{ flex: '1', padding: '0 16px' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {doctorsBookData.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
          <strong>Specialization:</strong> {doctorsBookData.specialization}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 0.5 }}>
          <strong>Hospital:</strong> {doctorsBookData.organization}
        </Typography>
      </CardContent>
    </Card>
      
    <TableContainer
  component={Paper}
  sx={{
    marginTop: 8,
    boxShadow: 6, // Elevated shadow for depth
    borderRadius: 4, // Smoother, rounder corners
    maxWidth: '80%', // Reduced width for better centering
    padding: 3, // Extra padding for breathing space
    overflowX: 'auto', // Ensure responsiveness on small screens
    margin: '0 auto', // Center the table horizontally
  }}
>
  {doctorsBookData.bookings["$values"].length > 0 ? (
    <Table sx={{ minWidth: 300, tableLayout: 'auto', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#2196f3', borderRadius: '4px' }}>
          <TableCell
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '12px',
              textAlign: 'center',
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
            }}
          >
            Booking Date
          </TableCell>
          <TableCell
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            Status
          </TableCell>
          <TableCell
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '12px',
              textAlign: 'center',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            Patient
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {doctorsBookData.bookings["$values"].map((booking) => (
          <TableRow
            key={booking.bookingId}
            sx={{
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': { backgroundColor: '#f5f5f5' }, 
              transition: 'background-color 0.3s ease', 
              borderRadius: '8px',
            }}
          >
            <TableCell sx={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
              {new Date(booking.bookingDate).toLocaleDateString()}
            </TableCell>
            <TableCell
              sx={{
                padding: '12px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 500,
                color: booking.status === 'Completed' ? '#4caf50' : '#f57c00',
              }}
            >
              {booking.status}
            </TableCell>
            <TableCell sx={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
              {booking.patientName ? booking.patientName : 'Record deleted'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        No bookings available
      </Typography>
    </Box>
  )}
</TableContainer>
     
      </div>
    ) : (
      <h1>Loading..</h1>
    )}
  </div>
  
  );
}

export default DoctorAdminView


