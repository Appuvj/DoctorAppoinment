import axios from 'axios';
import {  CircularProgress, Box } from '@mui/material';

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { FaCheckCircle, FaFileUpload } from 'react-icons/fa';
import { PatientContext } from './PatientDashContext';
import DbService from '../Api/DbService';

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

    
      <Modal open={showModal} onClose={handleCloseModal}>
  <Card 
    sx={{ 
      padding: 2, 
      margin: 'auto', 
      maxWidth: '90%', 
      maxHeight: '90vh', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)'
    }}
  >
    <Typography variant="h6" gutterBottom>
      Prescription
    </Typography>
    <img
      src={`data:image/png;base64,${booking.prescription}`}
      alt="Prescription"
      style={{ 
        width: '500px', 
        height: '500px', 
        objectFit: 'contain' // Maintain aspect ratio
      }}
    />
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleCloseModal} 
      sx={{ 
        marginTop: 2, 
        width: '150px'  // A fixed width for the button to make it look uniform
      }}
    >
      Close
    </Button>
  </Card>
</Modal>
<Modal open={showModal} onClose={handleCloseModal}>
  <Card 
    sx={{ 
      padding: 2, 
      margin: 'auto', 
      maxWidth: '90%', 
      maxHeight: '90vh', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)'
    }}
  >
    <Typography variant="h6" gutterBottom>
      Prescription
    </Typography>
    <img
      src={`data:image/png;base64,${booking.prescription}`}
      alt="Prescription"
      style={{ 
        width: '500px', 
        height: '500px', 
        objectFit: 'contain' // Maintain aspect ratio
      }}
    />
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleCloseModal} 
      sx={{ 
        marginTop: 2, 
        width: '150px'  // A fixed width for the button to make it look uniform
      }}
    >
      Close
    </Button>
  </Card>
</Modal>

    </Card>
  );
};
const PendingCard = ({ booking }) => {
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
         
        </Grid>
      </Grid>

    
    </Card>
  );
};

const CancelledCard = ({ booking }) => {
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
         
        </Grid>
      </Grid>

    
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

const PendingList = ({ bookings }) => {
  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => (
        booking.status.toLowerCase() === 'pending' && (
          <Grid item xs={12} sm={6} md={4} key={booking.bookingId}>
            <PendingCard booking={booking} />
          </Grid>
        )
      ))}
    </Grid>
  );
};

const CancelledList = ({ bookings }) => {


  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => (
        booking.status.toLowerCase() === 'cancelled' && (
          <Grid item xs={12} sm={6} md={4} key={booking.bookingId}>
            <CancelledCard booking={booking} />
          </Grid>
        )
      ))}
    </Grid>
  );

};
const Patientbookings = () => {
  const { patients, id } = useContext(PatientContext); // Destructure from context
  const [PatientBookingData, SetPatientBookingData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [cancelledData, setCancelledData] = useState([]);

  const fetchPatientData = async () => {
    try {
      const apiUrl = `Patient/${id}`;
      const response = await DbService.get(apiUrl);
      SetPatientBookingData(response.data.bookings["$values"]); // Set bookings data
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  // Handle file submission for completing bookings
  const submitData = async (booking, file) => {
    const formData = new FormData();
    formData.append('BookingDate', booking.bookingDate);
    formData.append('Status', 'Completed');
    formData.append('DoctorId', parseInt(booking.doctorId));
    formData.append('PatientId', parseInt(booking.patientId));
    formData.append('Prescription', file);

    try {
      const response = await DbService.put(`bookings/${booking.bookingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include the token
        },
      });
      console.log('Booking updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  // Organize bookings based on status
  useEffect(() => {
    if (patients) {
      const allBookings = patients.bookings["$values"];
      SetPatientBookingData(allBookings);

      // Categorize bookings based on their status
      setPendingData(allBookings.filter(booking => booking.status.toLowerCase() === 'pending'));
      setCompletedData(allBookings.filter(booking => booking.status.toLowerCase() === 'completed'));
      setBookedData(allBookings.filter(booking => booking.status.toLowerCase() === 'booked'));
      setCancelledData(allBookings.filter(booking => booking.status.toLowerCase() === 'cancelled'));
    }
  }, [patients]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Patient Bookings</Typography>
      
      <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
                        No records found
                    </Typography>

      {bookedData.length > 0 ? <BookingList bookings={bookedData} submitData={submitData} /> :
      <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
      No records found
  </Typography>
}

      <Typography variant="h6">Pending Appointments</Typography>
      {pendingData.length > 0 ? <PendingList bookings={pendingData} /> :
        <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
        No records found
    </Typography>
}

      <Typography variant="h6">Completed Appointments</Typography>
      {completedData.length > 0 ? <CompletedList bookings={completedData} /> :
         <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
         No records found
     </Typography>
}

      <Typography variant="h6">Cancelled Appointments</Typography>
      {cancelledData.length > 0 ? <CancelledList bookings={cancelledData} /> :
        <Typography variant="h6" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
        No records found
    </Typography>
}
    </div>
  );
};

export default Patientbookings;
