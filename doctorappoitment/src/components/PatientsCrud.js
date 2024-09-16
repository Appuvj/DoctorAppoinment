import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminDashContext';
import DbService from '../Api/DbService';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const PatientsCrud = () => {
  const { patients, fetchDatas } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients

  const handleShow = () => {
    setShowModal(true);
    setConfirmed(false);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmDelete = () => setConfirmed(true);

  useEffect(() => {
    if (confirmed && modelData.Id) {
      DbService.remove(`Patient/${modelData.Id}`, {}, sessionStorage.getItem("token"))
        .then((res) => {
          fetchDatas(); // Refresh patient list after deletion
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setConfirmed(false);
          handleClose();
        });
    }
  }, [confirmed, modelData.Id, fetchDatas]);

  const handleDelete = (patientId) => {
    const foundPatient = patients.find((patient) => patient.patientId === patientId);
    if (foundPatient) {
      setModelData({ name: foundPatient.name, Id: foundPatient.patientId });
      handleShow();
    }
  };

  const navigate = useNavigate();

  const handleEdit = (patientId) => {
    navigate(`${patientId}`);
  };

  const handleView = (patientId) => {
    navigate(`/admin/dashboard/patientview/${patientId}`);
  };

  // Handle search filtering
  useEffect(() => {
    if (patients && searchTerm) {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) // Match patient name with search term
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <DialogTitle id="confirmation-dialog-title">
          <Typography variant="h6">Are You Sure?</Typography>
          <Button
            onClick={handleClose}
            aria-label="Close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {modelData.name ? modelData.name : "Loading..."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Input */}
      <Box 
  sx={{ 
    mb: 4, 
    display: 'flex', 
    flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on mobile and horizontally on tablets and up
    justifyContent: { sm: 'space-between' }, // Space between items on tablets and up
    alignItems: 'center', 
    marginTop: 3 
  }}
>
  <Typography 
    variant="h4" 
    component="h2" 
    gutterBottom 
    sx={{ 
      mb: { xs: 2, sm: 0 }, // Margin bottom for mobile
      textAlign: { xs: 'center', sm: 'left' } // Center text on mobile and left-align on tablets and up
    }}
  >
    Patients List
  </Typography>
  <TextField
    label="Search by Name"
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
    sx={{ 
      width: { xs: '100%', sm: 'auto' }, // Full width on mobile and auto width on tablets and up
      maxWidth: { sm: '300px' }, // Optional: set a max width for larger screens
      mt: { xs: 2, sm: 0 } // Margin top for mobile
    }}
  />
</Box>



      <Grid container spacing={3}>
        {filteredPatients && filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Grid key={patient.patientId} item xs={12} sm={6} md={4}>
             <Card
  sx={{
    display: 'flex',
    flexDirection: 'column', // Ensure column layout for content
    alignItems: 'center', // Center align content horizontally
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    boxShadow: 2,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: 5,
      backgroundColor: '#e3f2fd',
    },
  }}
>
  <CardMedia
    component="img"
    sx={{
      width: 100, // Adjust width as needed
      height: 100, // Adjust height as needed
      borderRadius: '50%',
      border: '2px solid #1976d2',
      objectFit: 'cover', // Ensure image scales correctly
      marginBottom: 2, // Space between image and content
    }}
    image={`data:image/jpeg;base64,${patient.imageData}`}
    alt="Patient Profile"
  />
  <CardContent sx={{ textAlign: 'center', padding: 0 }}>
    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
      {patient.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {patient.email}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {patient.contact}
    </Typography>
  </CardContent>
  <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', width: '100%' }}>
    <Button variant="contained" color="primary" onClick={() => handleView(patient.patientId)} sx={{ flex: 1 }}>
      Bookings
    </Button>
    <Button variant="contained" color="warning" onClick={() => handleEdit(patient.patientId)} sx={{ flex: 1 }}>
      View
    </Button>
    <Button variant="contained" color="error" onClick={() => handleDelete(patient.patientId)} sx={{ flex: 1 }}>
      Delete
    </Button>
  </Box>
</Card>

            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
              No Records Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default PatientsCrud;
