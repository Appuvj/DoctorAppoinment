import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./patientadminview.css"
import DbService from '../Api/DbService'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PatientAdminView = () => {

    const {id} = useParams()

    const [patientsBookData,setPatientsBookData] = useState([])

    const GetById = async () => {
      DbService.get(`Patient/${id}`,{},sessionStorage.getItem("token")).then((res)=>setPatientsBookData(res.data)).catch((err)=>console.log(err))


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
        image={`data:image/jpeg;base64,${image}`} // Base64 image string
        alt={name}
      />

      {/* Patient Details */}
      <CardContent sx={{ flex: '1', padding: '0 16px' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
          <strong>Email:</strong> {email}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 0.5 }}>
          <strong>Contact:</strong> {contact}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 0.5 }}>
          <strong>Address:</strong> {address}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 0.5 }}>
          <strong>Gender:</strong> {gender}
        </Typography>
      </CardContent>
    </Card>

      {/* Booking Details Card */}
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
        backgroundColor: '#fff', // Background color for card
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bookings
      </Typography>

      {bookings?.$values.length > 0 ? (
        <Table sx={{ minWidth: 300, tableLayout: 'auto', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '12px',
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }}
              >
                Booking Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '12px',
                  backgroundColor: '#2196f3',
                  color: '#fff',
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '12px',
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                Doctor
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {bookings.$values.map((booking) => (
              <TableRow
                key={booking.bookingId}
                sx={{
                  backgroundColor: '#f9f9f9', // Light background color for contrast
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add shadow to rows
                  '&:hover': { backgroundColor: '#f5f5f5' }, // Hover effect
                  transition: 'background-color 0.3s ease', // Smooth transitions
                }}
              >
                <TableCell
                  sx={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: booking.status === 'Completed' ? '#4caf50' : '#f57c00',
                  }}
                >
                  {booking.status}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {booking.doctorName ? booking.doctorName : 'Record deleted'}
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
    )
}

export default PatientAdminView