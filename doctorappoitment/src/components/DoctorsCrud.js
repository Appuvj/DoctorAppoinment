import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from './AdminDashContext';
import { FaUserMd, FaPhoneAlt } from 'react-icons/fa';

const DoctorsCrud = () => {

    const { doctors,fetchDatas } = useContext(AdminContext);
    const [specializations,setSpecialization] = useState(); ;
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    useEffect(()=>{
        if(doctors)
        {
            setSpecialization([...new Set(doctors.map((doctor) => doctor.specialization))])
        }
        if (doctors 
            && selectedSpecialization) {
            setFilteredDoctors(doctors.filter((doctor) => doctor.specialization === selectedSpecialization));
          } else {
            setFilteredDoctors(doctors);
          }
    },[selectedSpecialization, doctors])
    const handleEdit = (doctorId) => {
        // Implement your edit logic here
      };
    
      const handleDelete = (doctorId) => {
        // Implement your delete logic here
      };
      const handleSpecializationChange = (event) => {
        setSelectedSpecialization(event.target.value);
      };
    return (
        <div>
        <h2>Doctors List</h2>
        <div className="mb-3">
          <label htmlFor="specializationFilter">Filter by Specialization:</label>
          {specializations ? 
          <select
            id="specializationFilter"
            className="form-select"
            value={ selectedSpecialization}
            onChange={handleSpecializationChange}
          >
            <option value="">All Specializations</option>
            {specializations.map((spec, index) => (
              <option key={index} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          : "Loading..."}
        </div>
        <div className="row">
          {filteredDoctors? (
            filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="col-12 col-md-6 mb-3">
                <div className="card p-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title"><FaUserMd className="me-2" />{doctor.name}</h5>
                      <p className="card-text mb-1">
                        <strong>Specialization:</strong> {doctor.specialization}
                      </p>
                      <p className="card-text mb-0">
                        <FaPhoneAlt className="me-2" />{doctor.contact}
                      </p>
                    </div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleEdit(doctor.id)}
                        className="btn btn-outline-warning btn-sm mx-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="btn btn-outline-danger btn-sm mx-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
    )
}

export default DoctorsCrud
