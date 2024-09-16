import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Drawer,
  ListItemIcon,
  ListItemText,
  ListItem,
  List
} from '@mui/material';
import { Home, EventNote, Search, History, Edit, Logout, Close, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DbService from '../Api/DbService';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    specialization: '',
    organization: '',
    gender: ''
  });
  const [patients, setPatients] = useState();
  const id = sessionStorage.getItem("Patient");
  const [doctorsList, setDoctorsList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleLogoutModalOpen = () => setLogoutModalOpen(true);
  const handleLogoutModalClose = () => setLogoutModalOpen(false);
  
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

  const fetchDatas = async () => {
    try {
      const patientsRes = await DbService.get(`Patient/${id}`, {}, sessionStorage.getItem("token"));
      setPatients(patientsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDoctors = async () => {
    const response = await DbService.get("Doctor/", {}, sessionStorage.getItem("token"));
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

  useEffect(() => {
    fetchDatas();
    fetchDoctors();
  }, [id]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleLogout = () => {
    sessionStorage.clear();
    console.log("Logged out");
    navigate("/login");
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      padding: theme.spacing(1),
    },
  }));

  return (
    <PatientContext.Provider
      value={{
        patients, id, doctorsList, filteredDoctors, specializations, organizations,
        locations, setFilteredDoctors, selectedDoctor, setSelectedDoctor, fetchDatas,
        fetchDoctors, filteredDoctors, setFilteredDoctors, specializations, setSpecializations,
        organizations, setOrganizations, locations, setLocations, selectedDoctor, setSelectedDoctor,
        filters, setFilters
      }}
    >
      <AppBar position="static" sx={{ paddingX: { xs: 1, sm: 2 }, paddingY: { xs: 1, sm: 2 } }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <StyledButton
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/patient-dash/")}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Home
          </StyledButton>

          <StyledButton
            variant="contained"
            startIcon={<Search />}
            onClick={() => navigate("search-doctor")}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Search Doctor
          </StyledButton>

          <StyledButton
            variant="contained"
            startIcon={<EventNote />}
            onClick={() => navigate("patient-bookings")}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Bookings
          </StyledButton>

          <StyledButton
            variant="contained"
            startIcon={<History />}
            onClick={() => navigate("medical-history")}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Medical History
          </StyledButton>

          <StyledButton
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate("edit-profile")}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Edit Profile
          </StyledButton>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' }, marginRight: 2 }}>
            Welcome {patients ? patients.name : ""}
          </Typography>

          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar alt="Patient Profile" src={`data:image/png;base64,${patients?.image}`} />
          </IconButton>

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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{ display: { sm: 'none' } }}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerClose}>
          <List>
            <ListItem button onClick={() => navigate("/patient-dash/")}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate("search-doctor")}>
              <ListItemIcon><Search /></ListItemIcon>
              <ListItemText primary="Search Doctor" />
            </ListItem>
            <ListItem button onClick={() => navigate("patient-bookings")}>
              <ListItemIcon><EventNote /></ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItem>
            <ListItem button onClick={() => navigate("medical-history")}>
              <ListItemIcon><History /></ListItemIcon>
              <ListItemText primary="Medical History" />
            </ListItem>
            <ListItem button onClick={() => navigate("edit-profile")}>
              <ListItemIcon><Edit /></ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Dialog open={openModal} onClose={handleModalClose} fullWidth maxWidth="xs">
        <DialogTitle>
          Close Profile
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              backgroundColor: '#f5f5f5',
              color: '#ff1744',
              border: '1px solid #ff1744',
              '&:hover': {
                backgroundColor: '#ff1744',
                color: '#ffffff',
              },
              transition: 'all 0.3s ease',
              width: 40,
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
          <Button onClick={handleLogout} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {children}
    </PatientContext.Provider>
  );
};
