import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Home, EventNote, Search, History, Edit, Logout,Close  } from '@mui/icons-material';
import {
  AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography, Dialog,
  DialogActions, DialogContent, DialogTitle, Button, Box
} from '@mui/material';
import DbService from '../Api/DbService';
import { styled } from '@mui/material/styles';


export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
   
  
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      // Add logout logic here
      console.log("Logged out");
      sessionStorage.clear()
      navigate("/login"); // Navigate to login page on logout
    };
    const [doctors, setDoctors] = useState();
    const id = sessionStorage.getItem("Doctor")
    const [doctorsList, setDoctorsList] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedDoctor,setSelectedDoctor] = useState()
    
    const [openModal, setOpenModal] = useState(false);

    // Function to handle modal open
    const handleModalOpen = () => setOpenModal(true);
  
    // Function to handle modal close
    const handleModalClose = () => setOpenModal(false);
    const StyledButton = styled(Button)(({ theme }) => ({
      color: theme.palette.primary.contrastText,
      margin: theme.spacing(1),
    }));


    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = getDayWithSuffix(date.getDate());
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
      }; 
      const getDayWithSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
          case 1: return `${day}st`;
          case 2: return `${day}nd`;
          case 3: return `${day}rd`;
          default: return `${day}th`;
        }
      };
  // Function to fetch all data
  const fetchDatas = async () => {
    try {
      const patientsRes = await DbService.get(`Doctor/${id}`,{},sessionStorage.getItem("token"));
        // console.log(patientsRes.data)
      setDoctors(patientsRes.data);
      // console.log(patientsRes)
      // console.log("yess")
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDoctors = async () => {
    const response = await DbService.get("Doctor/",{},sessionStorage.getItem("token"));
    const data = response.data["$values"];

    const uniqueSpecializations = [...new Set(data.map(doctor => doctor.specialization))];
    setSpecializations(uniqueSpecializations);

    const uniqueOrganizations = [...new Set(data.map(doctor => doctor.organization))];
    setOrganizations(uniqueOrganizations);

    const uniqueLocations = [...new Set(data.map(doctor => doctor.location))];
    setLocations(uniqueLocations);

    const doctorsData = data.map(doctor => ({
      id: doctor.doctorId,
      name: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.organization,
      image: doctor.imageData,
      availabilityDate: formatDate(doctor.availableFrom),
      gender: doctor.gender,
      location: doctor.location
    }));

    setDoctorsList(doctorsData);
    setFilteredDoctors(doctorsData);
  };
  // Fetch data when the component mounts
  useEffect(() => {
    
    fetchDatas();
    fetchDoctors();
  }, [id]);
  

  
    return (
      <DoctorContext.Provider value={{doctors, id, doctorsList, filteredDoctors, specializations, organizations, locations, 
      setFilteredDoctors, selectedDoctor, setSelectedDoctor, fetchDatas, fetchDoctors }}>
    <AppBar position="static">
        <Toolbar>
          {/* Home Button */}
          <StyledButton
  variant="contained" // Using "contained" variant for a solid background
  startIcon={<Home />}
  onClick={() => navigate("/doctor-dash")}
>
  Home
</StyledButton>

{/* Doctor Bookings Button */}
<StyledButton
  variant="contained"
  startIcon={<EventNote />}
  onClick={() => navigate("doctor-bookings")}
>
  Bookings
</StyledButton>

{/* Medical History Button */}
<StyledButton
  variant="contained"
  startIcon={<History />}
>
  Medical History
</StyledButton>

{/* Edit Profile Button */}
<StyledButton
  variant="contained"
  startIcon={<Edit />}
  onClick={() => navigate("doctor-edit")}
>
  Edit Profile
</StyledButton>

          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6" gutterBottom>
          Welcome {doctors?.name}

        </Typography>
          {/* Doctor Profile Avatar and X Button */}
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar alt="Doctor Profile" src={`data:image/png;base64,${doctors?.imageData}`} />
          </IconButton>

          {/* X Button to Open Modal */}
          <IconButton onClick={handleModalOpen} color="inherit">
            <Close />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("doctor-edit")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Dialog open={openModal} onClose={handleModalClose}>
  <DialogTitle>
    Close Profile
    {/* Styled X Button */}
    <IconButton
      aria-label="close"
      onClick={handleModalClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        backgroundColor: '#f5f5f5',  // Light background
        color: '#ff1744',  // Red color for the X
        border: '1px solid #ff1744',  // Red border
        '&:hover': {
          backgroundColor: '#ff1744',  // Red background on hover
          color: '#ffffff',  // White X on hover
        },
        transition: 'all 0.3s ease',  // Smooth hover transition
        width: 40,  // Increase size
        height: 40,
      }}
    >
      <Close />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <Typography variant="body1">
      Are you sure you want to close the profile section?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleModalClose} color="primary">
      Cancel
    </Button>
    <Button onClick={() => { handleLogout() }} color="primary" autoFocus>
      Confirm
    </Button>
  </DialogActions>
</Dialog>


      {/* Render child components */}
      {children}
</DoctorContext.Provider>

    );
  };