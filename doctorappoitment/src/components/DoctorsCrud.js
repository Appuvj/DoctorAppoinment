import React, { useEffect, useState, useContext } from 'react';
import { AdminContext } from './AdminDashContext';
import DbService from '../Api/DbService';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Button, TextField, Typography, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';

const DoctorsCrud = () => {
  const { doctors, fetchDatas } = useContext(AdminContext);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(9); // Maximum 9 doctors per page
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors) {
      setSpecializations([...new Set(doctors.map((doctor) => doctor.specialization))]);
    }
    if (doctors && selectedSpecialization) {
      setFilteredDoctors(doctors.filter((doctor) => doctor.specialization === selectedSpecialization));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialization, doctors]);

  const handleShow = () => {
    setShowModal(true);
    setConfirmed(false);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmDelete = () => setConfirmed(true);

  useEffect(() => {
    if (confirmed && modelData.id) {
      DbService.remove(`Doctor/${modelData.id}`, {}, sessionStorage.getItem("token"))
        .then(() => {
          fetchDatas(); 
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setConfirmed(false);
          handleClose();
        });
    }
  }, [confirmed, modelData.id, fetchDatas]);

  const handleDelete = (doctorId) => {
    const foundDoctor = doctors.find((doctor) => doctor.doctorId === doctorId);
    if (foundDoctor) {
      setModelData({ name: foundDoctor.name, id: foundDoctor.doctorId });
      handleShow();
    }
  };

  const handleEdit = (doctorId) => {
    navigate(`${doctorId}`);
  };

  const handleView = (doctorId) => {
    navigate(`/admin/dashboard/doctorview/${doctorId}`);
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Calculate the index for the sliced array
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

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
            {modelData ? modelData.name : "Loading..."}
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

      {/* Specialization Filter */}
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
          Doctors List
        </Typography>

        <FormControl
          sx={{
            minWidth: { xs: '100%', sm: 300 },
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            boxShadow: 1,
            p: 2,
            mt: { xs: 2, sm: 0 },
          }}
        >
          <InputLabel id="specializationFilterLabel">Filter by Specialization</InputLabel>
          {specializations === null ? (
            <Typography color="text.secondary" sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={24} sx={{ mr: 1 }} /> Loading...
            </Typography>
          ) : specializations.length > 0 ? (
            <Select
              labelId="specializationFilterLabel"
              id="specializationFilter"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              label="Filter by Specialization"
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="">All Specializations</MenuItem>
              {specializations.map((spec, index) => (
                <MenuItem key={index} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              No Specializations Available
            </Typography>
          )}
        </FormControl>
      </Box>

      {/* Doctors List */}
      <Grid container spacing={3}>
        {filteredDoctors === null ? (
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
              }}
            >
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ ml: 2 }}>Loading...</Typography>
            </Box>
          </Grid>
        ) : currentDoctors.length > 0 ? (
          currentDoctors.map((doctor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  image={`data:image/jpeg;base64,${doctor.imageData}`}
                  alt="Doctor Profile"
                />
                <CardContent sx={{ textAlign: 'center', padding: 2 }}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.specialization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.organization}
                  </Typography>
                </CardContent>
                <Box sx={{ padding: 2, display: 'flex', gap: 1, justifyContent: 'center', width: '100%' }}>
                  <Button size="small" color="info" variant="contained" onClick={() => handleView(doctor.doctorId)}>
                    Bookings
                  </Button>
                  <Button size="small" color="primary" variant="contained" onClick={() => handleEdit(doctor.doctorId)}>
                    View
                  </Button>
                  <Button size="small" color="error" variant="contained" onClick={() => handleDelete(doctor.doctorId)}>
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
              No doctors found.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredDoctors.length / doctorsPerPage)} // Calculate the total number of pages
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </Box>
    </div>
  );
};

export default DoctorsCrud;
