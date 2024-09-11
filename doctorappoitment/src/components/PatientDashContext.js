import React, { createContext, useEffect, useState } from 'react';
import axios  from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// Create a context with a default value
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Avatar, Button } from '@mui/material';
import { Home, EventNote, Search, History, Edit, Logout } from '@mui/icons-material';
import DbService from '../Api/DbService';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    location: '',
    specialization: '',
    organization: '',
    gender: ''
  });
    const [patients, setPatients] = useState();
    const id = sessionStorage.getItem("Patient")
    const [doctorsList, setDoctorsList] = useState([]);
 
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedDoctor,setSelectedDoctor] = useState()


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
      const patientsRes = await DbService.get(`Patient/${id}`,{},sessionStorage.getItem("token"));
        // console.log(patientsRes.data)
      setPatients(patientsRes.data);
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
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      // Add logout logic here
      sessionStorage.clear()
      console.log("Logged out");
      navigate("/login"); // Navigate to login page on logout
    };
  return (
    <PatientContext.Provider value={{ patients,id, doctorsList,filteredDoctors,specializations,organizations,locations,setFilteredDoctors,selectedDoctor,setSelectedDoctor, fetchDatas ,fetchDoctors,filteredDoctors, setFilteredDoctors,specializations, setSpecializations

        ,organizations, setOrganizations,locations, setLocations,selectedDoctor,setSelectedDoctor,filters, setFilters
    }}>
        <AppBar position="static">
      <Toolbar>
        {/* Navigation Icons */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => navigate("/patient-dash/")}
        >
          <Home />
        </IconButton>
        
        <IconButton
          color="inherit"
          aria-label="book appointment"
         
        >
          <EventNote />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="search doctor"
          onClick={() => navigate("search-doctor")}
        >
          <Search />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="patient bookings"
          onClick={() => navigate("patient-bookings")}
        >
          <EventNote />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="medical history"
          onClick={() => navigate("medical-history")}
        >
          <History />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="edit profile"
          onClick={() => navigate("edit-profile")}
        >
          <Edit />
        </IconButton>

        {/* Spacer to push content to the right */}
        <div style={{ flexGrow: 1 }} />

        {/* Welcome Message */}
        <Typography variant="h6" style={{ marginRight: '16px' }}>
          Welcome {patients ? patients.name : ""}
        </Typography>

        {/* Profile Picture */}
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar alt="Patient Profile" src={`data:image/jpeg;base64,${patients?.image}`} />
        </IconButton>

        {/* Menu for Profile and Logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate("/edit-profile")}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
        
      
      {children}
    </PatientContext.Provider>
  );
};