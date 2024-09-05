import React, { createContext, useEffect, useState } from 'react';
import axios  from 'axios';
// Create a context with a default value


export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [analyticsData, setAnalyticsData] = useState();

  // Function to fetch all data
  const fetchDatas = async () => {
    try {
      const doctorsRes = await axios.get("https://localhost:7146/api/Doctor");
      const patientsRes = await axios.get("https://localhost:7146/api/Patient");
      const appointmentsRes = await axios.get("https://localhost:7146/api/Bookings");
      const analyticsRes = await axios.get("https://localhost:7146/api/Admin/dashboard-stats");

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