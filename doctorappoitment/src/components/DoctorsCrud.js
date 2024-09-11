import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from './AdminDashContext';
import { FaUserMd, FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DbService from '../Api/DbService';
import { Grid, Card, CardMedia, CardContent, Button} from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';


const DoctorsCrud = () => {
  const { doctors, fetchDatas } = useContext(AdminContext);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  // Filter doctors based on specialization
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
  // Handle doctor deletion
  useEffect(() => {
    if (confirmed && modelData.id) {
      DbService.remove(`Doctor/${modelData.id}`,{},sessionStorage.getItem("token"))
        .then((res) => {
          console.log(res);
          fetchDatas(); // Refresh doctor list after deletion
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
    // console.log(`Editing doctor with ID: ${doctorId}`);
    navigate(`${doctorId}`)
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Are You Sure?</h5>
                <button type="button" className="close ms-auto" onClick={handleClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modelData ? modelData.name : "Loading..."}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show" aria-hidden="true"></div>}

      
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginTop:3}}>
  {/* Title */}
  <Typography variant="h4">
    Doctors List
  </Typography>

  {/* Specialization Filter */}
  <FormControl
    sx={{
      minWidth: 300, // Adjust width as needed
    }}
  >
    <InputLabel id="specializationFilterLabel">Filter by Specialization</InputLabel>
    {specializations ? (
      specializations.length > 0 ? (
        <Select
          labelId="specializationFilterLabel"
          id="specializationFilter"
          value={selectedSpecialization}
          onChange={handleSpecializationChange}
          label="Filter by Specialization"
        >
          <MenuItem value="">All Specializations</MenuItem>
          {specializations.map((spec, index) => (
            <MenuItem key={index} value={spec}>
              {spec}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No Records Found
        </Typography>
      )
    ) : (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    )}
  </FormControl>




    </Box>

      
    <Grid container spacing={3}>
      {filteredDoctors ? (
        filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}> {/* Adjust grid size per screen */}
             <Card
  sx={{
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: 2, // Rounded corners
    backgroundColor: '#f9f9f9', // Light background
    border: '1px solid #ddd', // Light outline
    transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition
    boxShadow: 2, // Default shadow
    '&:hover': {
      transform: 'scale(1.03)', // Slight scaling on hover
      boxShadow: 5, // Stronger shadow on hover
      backgroundColor: '#e3f2fd', // Light blue background on hover
    },
  }}
>
  {/* Profile Image */}
  <CardMedia
    component="img"
    sx={{
      width: 100,
      height: 100,
      borderRadius: '50%', // Circular profile image
      border: '2px solid #1976d2', // Border around image for style
    }}
    image={`data:image/jpeg;base64,${doctor.imageData}`}
    alt="Doctor Profile"
  />

  {/* Doctor Info */}
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

    {/* Buttons */}
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
          <h1>No Records Found</h1>
        )
      ) : (
        <p>Loading..</p>
      )}
    </Grid>

      
    </div>
  );
}

export default DoctorsCrud
