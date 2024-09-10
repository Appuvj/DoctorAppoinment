import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { FaCheckCircle, FaFileUpload } from 'react-icons/fa';
import { PatientContext } from './PatientDashContext';

const BookingCard = ({ booking, onComplete, submitData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust to your preferred date format
  };

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Modal message

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setUploading(false);
    } else {
      setModalMessage('Invalid file type. Please upload an image (PNG, JPEG) or PDF.');
      setShowModal(true); // Show modal with error message
      e.target.value = ''; // Clear the input
    }
  };

  const handleUpload = () => {
    if (!file) {
      setModalMessage("Please upload a prescription file.");
      setShowModal(true);
      return;
    }
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      // File uploaded successfully
    }, 1000);
  };

  const handleComplete = () => {
    if (!file) {
      setModalMessage("Please upload a prescription file before marking as completed.");
      setShowModal(true);
      return;
    }
    submitData(booking, file); // Call the onComplete callback with booking ID
  };

  const Base64Image = ({ base64String }) => {
    const imageSrc = `data:image/png;base64,${base64String}`;
    return (
      <img src={imageSrc} alt="Converted" style={{ width: '100%', height: 'auto' }} />
    );
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2, boxShadow: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Base64Image base64String={booking.doctorImage} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>{booking.doctorName}</Typography>
          <Typography variant="body1" color="textSecondary">Status: {booking.status}</Typography>
          <Typography variant="body1" color="textSecondary">Date: {formatDate(booking.bookingDate)}</Typography>
        </Grid>
      </Grid>


      {/* Modal for displaying messages */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Card sx={{ padding: 2, margin: 2 }}>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">{modalMessage}</Typography>
          <Button variant="contained" color="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Card>
      </Modal>
    </Card>
  );
};

const CompletedCard = ({ booking }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust to your preferred date format
  };

  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const Base64Image = ({ base64String }) => {
    const imageSrc = `data:image/png;base64,${base64String}`;
    return (
      <img src={imageSrc} alt="Converted" style={{ width: '100%', height: 'auto' }} />
    );
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2, boxShadow: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Base64Image base64String={booking.doctorImage} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>{booking.doctorName}</Typography>
          <Typography variant="body1" color="textSecondary">Status: {booking.status}</Typography>
          <Typography variant="body1" color="textSecondary">Date: {formatDate(booking.bookingDate)}</Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleShowModal}
            sx={{ marginTop: 2 }}
          >
            View Prescription
          </Button>
        </Grid>
      </Grid>

      {/* Modal for prescription */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Card sx={{ padding: 2, margin: 2 }}>
          <Typography variant="h6">Prescription</Typography>
          <img
            src={`data:image/png;base64,${booking.prescription}`}
            alt="Prescription"
            style={{ width: '100%', height: 'auto' }}
          />
          <Button variant="contained" color="secondary" onClick={handleCloseModal} sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Card>
      </Modal>
    </Card>
  );
};

const BookingList = ({ bookings, submitData }) => {
  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => (
        booking.status.toLowerCase() === 'booked' && (
          <Grid item xs={12} sm={6} md={4} key={booking.bookingId}>
            <BookingCard booking={booking} submitData={submitData} />
          </Grid>
        )
      ))}
    </Grid>
  );
};

const CompletedList = ({ bookings }) => {
  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => (
        booking.status.toLowerCase() === 'completed' && (
          <Grid item xs={12} sm={6} md={4} key={booking.bookingId}>
            <CompletedCard booking={booking} />
          </Grid>
        )
      ))}
    </Grid>
  );
};

const Patientbookings = () => {
  const { patients, id } = useContext(PatientContext);
  const [PatientBookingData, SetpatientbookingData] = useState(null);

  const fetchDoctorData = async () => {
    const apiUrl = `https://localhost:7146/api/Patient/${id}`;
    try {
      const response = await axios.get(apiUrl);
      SetpatientbookingData(response.data);
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
      const response = await axios.put(`https://localhost:7146/api/bookings/${booking.bookingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Booking updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  useEffect(() => {
    SetpatientbookingData(patients ? patients.bookings["$values"] : []);
  }, [patients]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Booked Appointments</Typography>
      {PatientBookingData && <BookingList bookings={PatientBookingData} submitData={submitData} />}
      
      <Typography variant="h4" gutterBottom>Completed Appointments</Typography>
      {PatientBookingData && <CompletedList bookings={PatientBookingData} />}
    </div>
  );
};

export default Patientbookings;
