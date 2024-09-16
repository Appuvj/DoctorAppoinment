import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import { FaCheck, FaTimes, FaCalendarAlt, FaCalendarCheck ,FaBan} from 'react-icons/fa';
import axios from "axios"
import DbService from '../Api/DbService';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    useMediaQuery,
  } from '@mui/material';import { useTheme } from '@mui/material/styles';

import { green, red, yellow } from '@mui/material/colors';

const AppoimentsCrud = () => {
    const { appointments, fetchDatas } = useContext(AdminContext);
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [cancelledAppointments, setCancelledAppointments] = useState([]);
    const theme = useTheme(); // Get the theme object
    const isMobileLarge = useMediaQuery(theme.breakpoints.down('lg'));
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(""); // "confirm" or "cancel"
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const [modelData, setModelData] = useState({});
    const [confirmed, setConfirmed] = useState(false);
  
    const handleOpenDialog = (appointment, type) => {
      setSelectedAppointment(appointment);
      setActionType(type);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedAppointment(null);
      setActionType('');
    };
  
    const handleConfirmAction = () => {
      if (selectedAppointment && actionType) {
        handleAction(selectedAppointment, actionType);
      }
      handleCloseDialog();
    };
    const handleShow = () => {
        setShowModal(true);
        setConfirmed(false);
      };
    
      const handleClose = () => setShowModal(false);
    
      const handleConfirmDelete = () => setConfirmed(true);
    useEffect(() => {
        if (appointments) {
            // console.log(appointments)
            setPendingAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "pending" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
              
              setBookedAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "booked" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
              
              setCompletedAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "completed" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
              
              setCancelledAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "cancelled" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
        }
    }, [appointments]);

    const handleAction =async (appointment, action) => {
        console.log(action)
        setSelectedAppointment(appointment);
        setModalAction(action);
        setShowModal(true);
        // handleModalConfirm()
        // if(action === "confirm"){
        // axios.put(`https://localhost:7146/api/Bookings/${appointment.bookingId}`,{
        //     "bookingDate": appointment.bookingDate,
        //     "status": "Booked",
        //     "doctorId": appointment.doctorId,
        //     "patientId": appointment.patientId
        //   }).then((res)=>console.log(res)).catch((err)=>console.log(err))
        // }
        // else {
        //     axios.put(`https://localhost:7146/api/Bookings/${appointment.bookingId}`,{
        //         "bookingDate": appointment.bookingDate,
        //         "status": "Cancelled",
        //         "doctorId": appointment.doctorId,
        //         "patientId": appointment.patientId
        //       }).then((res)=>console.log(res)).catch((err)=>console.log(err))
                
        // }

       

    
        
    };

    const handleModalConfirm = () => {
        if (selectedAppointment && modalAction) {
            const updatedStatus = modalAction === "confirm" ? "Booked" : "Cancelled";
            console.log(selectedAppointment)
            const formData = new FormData();
            formData.append("status", updatedStatus);
            formData.append("DoctorId", selectedAppointment.doctorId);
            formData.append("PatientId", selectedAppointment.patientId);
            formData.append("Prescription",null)
    
            DbService.put(`Bookings/${selectedAppointment.bookingId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for FormData
                }
            },sessionStorage.getItem("token")).then((res) => {
                setShowModal(false);
                fetchDatas(); // Refetch data to update the list
            }).catch((err) => {
                console.log(err);
                setShowModal(false);
            });
        }
    };

    return (
        <div>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        <FaCalendarCheck style={{ marginRight: 8, color: yellow[500] }} />
        Pending Appointments
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {!pendingAppointments ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Loading...
            </Typography>
          </Box>
        ) : pendingAppointments.length > 0 ? (
          <List>
            {pendingAppointments.map((appointment) => (
                <ListItem
                key={appointment.bookingId}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid #ddd',
                  paddingY: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      <strong>Patient:</strong> {appointment.patientName} <br />
                      <strong>Doctor:</strong> {appointment.doctorName} <br />
                      <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                      <strong>Status:</strong> {appointment.status}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  sx={{
                    display: 'flex',
                    flexDirection: isMobileLarge ? 'column' : 'row',
                    gap: 1,
                    marginTop: isMobileLarge ? 1 : 0, // Margin on top when in mobile view
                    marginLeft: isMobileLarge ? 0 : 'auto', // Align buttons to the right in large screens
                  }}
                >
                  <IconButton
                    onClick={() => handleAction(appointment, 'confirm')}
                    edge="end"
                    sx={{
                      color: green[500],
                      '&:hover': { color: green[700] },
                      marginBottom: isMobileLarge ? 1 : 0, // Space between buttons on mobile
                    }}
                  >
                    <FaCheck />
                  </IconButton>
                  <IconButton
                    onClick={() => handleAction(appointment, 'cancel')}
                    edge="end"
                    sx={{
                      color: red[500],
                      '&:hover': { color: red[700] },
                    }}
                  >
                    <FaTimes />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
         ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No Records Found
          </Typography>
        )}
      </Paper>
    
    </Box>


    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        <FaCalendarCheck style={{ marginRight: 8, color: '#1976d2' }} />
        Booked Appointments
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {!bookedAppointments ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Loading...
            </Typography>
          </Box>
        ) : bookedAppointments.length > 0 ? (
          <List>
            {bookedAppointments.map((appointment) => (
              <ListItem
                key={appointment.bookingId}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid #ddd',
                  paddingY: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      <strong>Patient:</strong> {appointment.patientName} <br />
                      <strong>Doctor:</strong> {appointment.doctorName} <br />
                      <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                      <strong>Status:</strong> {appointment.status}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No Records Found
          </Typography>
        )}
      </Paper>
    </Box>

            <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        <FaCalendarCheck style={{ marginRight: 8, color: '#4caf50' }} /> 
        Completed Appointments
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {!completedAppointments ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Loading...
            </Typography>
          </Box>
        ) : completedAppointments.length > 0 ? (
          <List>
            {completedAppointments.map((appointment) => (
              <ListItem
                key={appointment.bookingId}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid #ddd',
                  paddingY: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      <strong>Patient:</strong> {appointment.patientName} <br />
                      <strong>Doctor:</strong> {appointment.doctorName} <br />
                      <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                      <strong>Status:</strong> {appointment.status}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No Records Found
          </Typography>
        )}
      </Paper>
    </Box>

            <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        <FaBan style={{ marginRight: 8, color: theme.palette.error.main }} /> 
        Cancelled Appointments
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {!cancelledAppointments ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Loading...
            </Typography>
          </Box>
        ) : cancelledAppointments.length > 0 ? (
          <List>
            {cancelledAppointments.map((appointment) => (
              <ListItem
                key={appointment.bookingId}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid #ddd',
                  paddingY: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      <strong>Patient:</strong> {appointment.patientName} <br />
                      <strong>Doctor:</strong> {appointment.doctorName} <br />
                      <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                      <strong>Status:</strong> {appointment.status}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No Records Found
          </Typography>
        )}
      </Paper>
    </Box>
            {showModal && (
                    <Dialog
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    sx={{
                        '& .MuiDialog-paper': {
                            borderRadius: 2,
                            width: '500px',
                            maxWidth: '100%',
                        },
                    }}
                >
                    <DialogTitle id="modal-title" sx={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 'bold' 
                    }}>
                        {modalAction === "confirm" ? "Confirm Appointment" : "Cancel Appointment"}
                        <Button 
                            onClick={() => setShowModal(false)} 
                            sx={{ 
                                position: 'absolute', 
                                top: 8, 
                                right: 8 
                            }}
                        >
                            &times;
                        </Button>
                    </DialogTitle>
                    <DialogContent sx={{ 
                        fontSize: '1rem' 
                    }}>
                        Are you sure you want to {modalAction} this appointment?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowModal(false)} color="secondary">
                            Close
                        </Button>
                        <Button onClick={handleModalConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
 
        </div>
    );
}

export default AppoimentsCrud
