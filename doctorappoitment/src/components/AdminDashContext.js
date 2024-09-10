import React, { createContext, useContext, useEffect, useState } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from './DoctorDashContext';
import DbService from '../Api/DbService';
// Create a context with a default value


export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const navigate = useNavigate();
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
    navigate("/login"); // Navigate to login page on logout
  };
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [analyticsData, setAnalyticsData] = useState();
  const token = sessionStorage.getItem("token")
  // Function to fetch all data
  const fetchDatas = async () => {
    try {
      const doctorsRes = await DbService.get("Doctor",{},token);
      const patientsRes = await DbService.get("Patient",{},token);
      const appointmentsRes = await DbService.get("Bookings",{},token);
      const analyticsRes = await DbService.get("Admin/dashboard-stats",{},token);

      setDoctors(doctorsRes.data["$values"]);
      setPatients(patientsRes.data["$values"]);
      setAppointments(appointmentsRes.data["$values"]);
      setAnalyticsData(analyticsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <AdminContext.Provider value={{ patients, doctors, appointments, analyticsData, fetchDatas }}>
      
      {children}
    </AdminContext.Provider>
  );
};