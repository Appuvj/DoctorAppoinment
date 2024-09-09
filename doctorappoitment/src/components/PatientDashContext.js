import React, { createContext, useEffect, useState } from 'react';
import axios  from 'axios';
import { useParams } from 'react-router-dom';
// Create a context with a default value


export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
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
      const patientsRes = await axios.get(`https://localhost:7146/api/Patient/${id}`);
        console.log(patientsRes.data)
      setPatients(patientsRes.data["$values"]);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDoctors = async () => {
    const response = await axios.get("https://localhost:7146/api/Doctor/");
    const data = response.data["$values"];

    const uniqueSpecializations = [...new Set(data.map(doctor => doctor.specialization))];
    setSpecializations(uniqueSpecializations);

    const uniqueOrganizations = [...new Set(data.map(doctor => doctor.organization))];
    setOrganizations(uniqueOrganizations);

    const uniqueLocations = [...new Set(data.map(doctor => doctor.location))];
    setLocations(uniqueLocations);

    const doctorsData = data.map(doctor => ({
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
  }, []);

  return (
    <PatientContext.Provider value={{ patients,id, doctorsList,filteredDoctors,specializations,organizations,locations,setFilteredDoctors,selectedDoctor,setSelectedDoctor, fetchDatas ,fetchDoctors}}>
      {children}
    </PatientContext.Provider>
  );
};