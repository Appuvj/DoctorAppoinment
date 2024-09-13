import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DbService from '../Api/DbService';


export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const navigate = useNavigate();

 

  
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [analyticsData, setAnalyticsData] = useState();
  const token = sessionStorage.getItem("token")
  const fetchDatas = async () => {
    try {
      const doctorsRes = await DbService.get("Doctor",{},token);
      if(doctorsRes.status === 401)
      {
        if(window.confirm("Token Expired!"))
        {
          navigate("/login")
        }
      }
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

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <AdminContext.Provider value={{ patients, doctors, appointments, analyticsData, fetchDatas }}>
      
      {children}
    </AdminContext.Provider>
  );
};