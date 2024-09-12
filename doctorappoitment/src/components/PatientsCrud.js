import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import DbService from '../Api/DbService';
import { Grid, Card, CardMedia, CardContent, Button} from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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

    {showModal && <div className="modal-backdrop fade show" aria-hidden="true"></div>}

    <Typography variant="h4" component="h2" gutterBottom>
      Patients List
    </Typography>

    <Grid container spacing={3}>
      {patients ? patients.length > 0 ? (
        patients.map((patient) => (
          <Grid key={patient.patientId} item xs={12} sm={6} md={4}>
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
                image={`data:image/jpeg;base64,${patient.imageData}`}
                alt="Patient Profile"
              />
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
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
            No Records Found
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
            Loading...
          </Typography>
        </Grid>
      )}
    </Grid>
  </div>
  );
}

export default PatientsCrud
