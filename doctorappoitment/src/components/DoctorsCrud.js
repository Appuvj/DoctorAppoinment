import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from './AdminDashContext';

import { useNavigate } from 'react-router-dom';
import DbService from '../Api/DbService';
import { Grid, Card, CardMedia, CardContent, Button} from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box,CircularProgress  } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';



const DoctorsCrud = () => {
  const { doctors, fetchDatas } = useContext(AdminContext);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);

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

  const handleView = (doctorId) => {
    navigate(`/admin/dashboard/doctorview/${doctorId}`)
  }
  useEffect(() => {
    if (confirmed && modelData.id) {
      DbService.remove(`Doctor/${modelData.id}`,{},sessionStorage.getItem("token"))
        .then((res) => {
          console.log(res);
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
    console.log(doctorId)
    const foundDoctor = doctors.find((doctor) => doctor.doctorId === doctorId);
    if (foundDoctor) {
      setModelData({ "name": foundDoctor.name, "id": foundDoctor.doctorId });
      handleShow();
    }
  };

  const navigate = useNavigate();
  const handleEdit = (doctorId) => {
   
    navigate(`${doctorId}`)
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
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
          padding: 3, 
          borderRadius: 2, 
          boxShadow: 3, 
          transition: 'transform 0.3s ease', 
        },
      }}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          paddingBottom: 2,
        }}
      >
        Are You Sure?
        <Button
          onClick={handleClose}
          aria-label="Close"
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
            },
          }}
        >
          <span aria-hidden="true">&times;</span>
        </Button>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingY: 3,
        }}
      >
        <Typography variant="body1">
          {modelData ? modelData.name : "Loading..."}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: 2,
          justifyContent: 'center', // Center buttons
          gap: 2,
        }}
      >
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleConfirmDelete} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  
      {showModal && <div className="modal-backdrop fade show" aria-hidden="true"></div>}

      
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginTop:3}}>
  
  <Typography variant="h4">
    Doctors List
  </Typography>

  <FormControl
      sx={{
        minWidth: 300, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 1, 
        boxShadow: 1,
        p: 2,
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
        </Typography>
      )}
    </FormControl>

</Box>

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
      ) : filteredDoctors.length > 0 ? (
        
        filteredDoctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                borderRadius: 2, 
                backgroundColor: '#f9f9f9', 
                border: '1px solid #ddd', 
                transition: 'transform 0.3s, box-shadow 0.3s', 
                boxShadow: 2, 
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
                }}
                image={`data:image/jpeg;base64,${doctor.imageData}`}
                alt="Doctor Profile"
              />

           
              <CardContent sx={{ marginLeft: 2, flex: '1' }}>
                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.specialization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.organization}
                </Typography>

                
                <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
                  <Button variant="contained" color="primary" onClick={() => handleView(doctor.doctorId)}>
                    View
                  </Button>
                  <Button variant="contained" color="warning" onClick={() => handleEdit(doctor.doctorId)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(doctor.doctorId)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh', 
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No Records Found
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>

      
    </div>
  );
}

export default DoctorsCrud
