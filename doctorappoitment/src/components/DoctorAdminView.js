import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminContext } from './AdminDashContext';
import './doctoradminview.css';
import DbService from '../Api/DbService';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DoctorAdminView = () => {
  const { doctors, appointments, fetchDatas } = useContext(AdminContext);
  const { id } = useParams();

  const [doctorsBookData, setDoctorsBookData] = useState(null);

  const getById = async () => {
    try {
      const response = await DbService.get(`Doctor/${id}`, {}, sessionStorage.getItem("token"));
      setDoctorsBookData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getById();
  }, [id]);

  if (!doctorsBookData) {
    return <div>Loading...</div>;
  }

  const { name, specialization, organization, imageData, bookings } = doctorsBookData;

  return (
    <div>
      {/* Doctor Details Card */}
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Column on small screens, row on larger
          alignItems: 'center',
          padding: 2,
          boxShadow: 4, // Increased shadow for depth
          borderRadius: 3, // Rounded corners
          maxWidth: '90%', // Responsive max width
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
            width: { xs: 100, sm: 120 }, // Responsive width
            height: { xs: 100, sm: 120 }, // Responsive height
            borderRadius: '50%',
            marginBottom: { xs: 2, sm: 0 }, // Margin at the bottom for small screens
            marginRight: { sm: 2 }, // Margin to the right on larger screens
            border: '3px solid #1976d2', // Border around image for style
          }}
          image={`data:image/jpeg;base64,${imageData}`} // Base64 image string
          alt={name}
        />

        {/* Doctor Details */}
        <CardContent sx={{ flex: '1', padding: '0 16px', textAlign: 'center' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
            <strong>Specialization:</strong> {specialization}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginTop: 0.5 }}>
            <strong>Hospital:</strong> {organization}
          </Typography>
        </CardContent>
      </Card>

      {/* Booking Details Table */}
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 8,
          boxShadow: 6, // Elevated shadow for depth
          borderRadius: 4, // Smoother, rounder corners
          maxWidth: '90%', // Responsive max width
          padding: 3, // Extra padding for breathing space
          overflowX: 'auto', // Ensure responsiveness on small screens
          margin: '0 auto', // Center the table horizontally
          backgroundColor: '#fff', // Background color for card
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Bookings
        </Typography>

        {bookings?.["$values"]?.length > 0 ? (
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
                  Patient
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {bookings["$values"].map((booking) => (
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
  );
}

export default DoctorAdminView;
