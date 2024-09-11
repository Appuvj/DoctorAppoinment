import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { FaCheckCircle, FaFileUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { DoctorContext } from './DoctorDashContext';
import DbService from '../Api/DbService';

const BookingCard = ({ booking, submitData }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setUploading(false);
    } else {
      setModalMessage('Invalid file type. Please upload an image (PNG, JPEG) or PDF.');
      setShowModal(true);
      e.target.value = ''; // Clear the input
    }
  };

  const handleUpload = () => {
    if (!file) {
      setModalMessage('Please upload a prescription file.');
      setShowModal(true);
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 1000);
  };

  const handleComplete = () => {
    if (!file) {
      setModalMessage('Please upload a prescription file before marking as completed.');
      setShowModal(true);
      return;
    }
    submitData(booking, file);
  };

  const Base64Image = ({ base64String }) => {
    const imageSrc = `data:image/png;base64,${base64String}`;
    return <img src={imageSrc} alt="Patient" style={{ width: '100px', height: '100px', borderRadius: '8px' }} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ padding: 2, boxShadow: 3 }}>
        {/* Horizontal layout for the image and text */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Image on the left */}
          <Box display="flex" alignItems="center" mr={2}>
            <Base64Image base64String={booking.patientImage} />
          </Box>

          {/* Text in the center */}
          <Box flexGrow={1} ml={2}>
            <Typography variant="h6" gutterBottom>{booking.patientName}</Typography>
            <Typography>Status: {booking.status}</Typography>
            <Typography>Date: {formatDate(booking.bookingDate)}</Typography>
            <Box mt={1}>
              <Typography variant="body2" color="text.secondary">{booking.message}</Typography>
            </Box>
          </Box>

          {/* Buttons on the right */}
          <Box display="flex" flexDirection="column" alignItems="center" ml={2}>
            <Button
              variant="contained"
              onClick={() => navigate(`/doctor-dash/medical-history/${booking.patientId}`)}
              sx={{ marginBottom: 1 }}
            >
              View Medical History
            </Button>
            {booking.status.toLowerCase() === 'booked' && (
              <>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id={`file-upload-${booking.bookingId}`}
                />
                <label htmlFor={`file-upload-${booking.bookingId}`}>
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<FaFileUpload />}
                    disabled={uploading}
                    sx={{ marginBottom: 1 }}
                  >
                    {uploading ? 'Uploading...' : 'Upload Prescription'}
                  </Button>
                </label>

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<FaCheckCircle />}
                  onClick={handleComplete}
                >
                  Mark as Completed
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Card>

      {/* Modal for errors */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Grid>
  );
};

const DoctorBookingList = () => {
  const { id, fetchDatas, fetchDoctors } = useContext(DoctorContext);
  const [DoctorBookingData, SetDoctorbookingData] = useState(null);
  const [changes, setChanges] = useState(false);

  const fetchDoctorData = async () => {
    const apiUrl = `Doctor/${id}`;
    try {
      const response = await DbService.get(apiUrl,{},sessionStorage.getItem("token"));
      SetDoctorbookingData(response.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const submitData = async (booking, file) => {
    const formData = new FormData();
    formData.append('BookingDate', booking.bookingDate);
    formData.append('Status', 'Completed');
    formData.append('DoctorId', parseInt(booking.doctorId));
    formData.append('PatientId', parseInt(booking.patientId));
    formData.append('Prescription', file);

    try {
      await DbService.put(`bookings/${booking.bookingId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      },sessionStorage.getItem("token"));
      setChanges(!changes);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  useEffect(() => {
    fetchDoctorData();
    fetchDoctors();
    fetchDatas();
  }, [id, changes]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Doctor Booking List</Typography>
      <Grid container spacing={3}>
        {DoctorBookingData ? (
          DoctorBookingData.bookings["$values"]
            .filter((booking) => booking.status.toLowerCase() === 'booked')
            .map((booking) => (
              <BookingCard key={booking.bookingId} booking={booking} submitData={submitData} />
            ))
        ) : (
          <Typography>No bookings available.</Typography>
        )}
      </Grid>
      <Typography variant="h4" gutterBottom mt={4}>Completed List</Typography>
      <Grid container spacing={3}>
        {DoctorBookingData ? (
          DoctorBookingData.bookings["$values"]
            .filter((booking) => booking.status.toLowerCase() === 'completed')
            .map((booking) => (
              <BookingCard key={booking.bookingId} booking={booking} />
            ))
        ) : (
          <Typography>No data available.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default DoctorBookingList;
