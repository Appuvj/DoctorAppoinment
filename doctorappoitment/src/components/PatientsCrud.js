import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminDashContext';
import DbService from '../Api/DbService';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Button, TextField, Pagination } from '@mui/material';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const PatientsCrud = () => {
  const { patients, fetchDatas } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 9; // Limit to 9 patients per page

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

  // Get current patients based on pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: { sm: 'space-between' }, 
          alignItems: 'center', 
          marginTop: 3 
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: { xs: 2, sm: 0 }, 
            textAlign: { xs: 'center', sm: 'left' } 
          }}
        >
          Patients List
        </Typography>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: { xs: '100%', sm: 'auto' }, 
            maxWidth: { sm: '300px' }, 
            mt: { xs: 2, sm: 0 }
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {currentPatients && currentPatients.length > 0 ? (
          currentPatients.map((patient) => (
            <Grid key={patient.patientId} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    border: '2px solid #1976d2',
                    objectFit: 'cover',
                    marginBottom: 2,
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

      {/* Pagination Component */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredPatients.length / patientsPerPage)} // Calculate the total number of pages
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default PatientsCrud;
