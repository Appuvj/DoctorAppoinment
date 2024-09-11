import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import DbService from '../Api/DbService';
import { Grid, Card, CardMedia, CardContent, Button} from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
const PatientsCrud = () => {



   const { patients, fetchDatas } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleShow = () => {
    setShowModal(true);
    setConfirmed(false);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmDelete = () => setConfirmed(true);

  // Handle patient deletion
  useEffect(() => {
    if (confirmed && modelData.Id) {
      DbService.remove(`Patient/${modelData.Id}`,{},sessionStorage.getItem("token"))
        .then((res) => {
          // console.log(res);
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
    navigate(`${patientId}`)
  };


const handleView = (patientId) => {
  navigate(`/admin/dashboard/patientview/${patientId}`)
}



  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Are You Sure?</h5>
                <button type="button" className="close ms-auto" onClick={handleClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modelData.name ? modelData.name : "Loading..."}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show" aria-hidden="true"></div>}

      <h2>Patients List</h2>
      
      <Grid container spacing={3}>
        {patients ?   patients.length>0 ? (
          patients.map((patient) => (


            <Grid key={patient.patientId} item xs={12} sm={6} md={4} > {/* Adjust grid size per screen */}
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
   image={`data:image/jpeg;base64,${patient.imageData}`}
   alt="Doctor Profile"
 />

 {/* Doctor Info */}
 <CardContent sx={{ marginLeft: 2, flex: '1' }}>
   <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
   {patient.name}
   </Typography>
   <Typography variant="body2" color="text.secondary">
   {patient.email}
   </Typography>
   <Typography variant="body2" color="text.secondary">
   {patient.contact}
   </Typography>

   {/* Buttons */}
   <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
     <Button variant="contained" color="primary" onClick={() => handleView(patient.patientId)}>
       View
     </Button>
     <Button variant="contained" color="warning" onClick={() => handleEdit(patient.patientId)}>
       Edit
     </Button>
     <Button variant="contained" color="error" onClick={() => handleDelete(patient.patientId)}>
       Delete
     </Button>
   </Box>
 </CardContent>
</Card>

           </Grid>
            // <div key={patient.patientId} className="col-12 col-md-6 mb-3">
            //   <div className="card p-2">
            //     <div className="card-body d-flex justify-content-between align-items-center">
            //       <div>
            //         <h5 className="card-title">{patient.name}</h5>
            //         <p className="card-text mb-1"><strong>Email:</strong> {patient.email}</p>
            //         <p className="card-text mb-0"><strong>Contact:</strong> {patient.contact}</p>
            //       </div>
            //       <div className="d-flex">
            //       <button onClick={() => handleView(patient.patientId)} className="btn btn-outline-info btn-sm mx-1">
            //           View
            //         </button>
            //         <button onClick={() => handleEdit(patient.patientId)} className="btn btn-outline-warning btn-sm mx-1">
            //           Edit
            //         </button>
            //         <button onClick={() => handleDelete(patient.patientId)} className="btn btn-outline-danger btn-sm mx-1">
            //           Delete
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))
        ) : <h1>No Records Found </h1> : (
          <p>Loading...</p>
        )}
        </Grid>
      
    </div>
  );
}

export default PatientsCrud
