import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from './AdminDashContext';
import { FaUserMd, FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorsCrud = () => {
  const { doctors, fetchDatas } = useContext(AdminContext);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  // Filter doctors based on specialization
  useEffect(() => {
    if (doctors) {
      setSpecializations([...new Set(doctors.map((doctor) => doctor.specialization))]);
    }
    if (doctors && selectedSpecialization) {
      setFilteredDoctors(doctors.filter((doctor) => doctor.specialization === selectedSpecialization));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialization, doctors]);

  const handleShow = () => {
    setShowModal(true);
    setConfirmed(false);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmDelete = () => setConfirmed(true);

  const handleView = (doctorId) => {
    navigate(`/admin/dashboard/doctorview/${doctorId}`)
  }
  // Handle doctor deletion
  useEffect(() => {
    if (confirmed && modelData.id) {
      axios
        .delete(`https://localhost:7146/api/Doctor/${modelData.id}`)
        .then((res) => {
          console.log(res);
          fetchDatas(); // Refresh doctor list after deletion
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setConfirmed(false);
          handleClose();
        });
    }
  }, [confirmed, modelData.id, fetchDatas]);

  const handleDelete = (doctorId) => {
    console.log(doctorId)
    const foundDoctor = doctors.find((doctor) => doctor.doctorId === doctorId);
    if (foundDoctor) {
      setModelData({ "name": foundDoctor.name, "id": foundDoctor.doctorId });
      handleShow();
    }
  };

  const navigate = useNavigate();
  const handleEdit = (doctorId) => {
    // console.log(`Editing doctor with ID: ${doctorId}`);
    navigate(`${doctorId}`)
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Are You Sure?</h5>
                <button type="button" className="close ms-auto" onClick={handleClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modelData ? modelData.name : "Loading..."}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show" aria-hidden="true"></div>}

      <h2>Doctors List</h2>
      <div className="mb-3">
        <label htmlFor="specializationFilter">Filter by Specialization:</label>
        {specializations ?  specializations.length > 0 ? (
          <select
            id="specializationFilter"
            className="form-select"
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
          >
            <option value="">All Specializations</option>
            {specializations.map((spec, index) => (
              <option key={index} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        ) : <p>No Records Found</p>  : (
          "Loading..."
        )}
      </div>

      <div className="row">
        {filteredDoctors ? filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.doctorId} className="col-12 col-md-6 mb-3">
              <div className="card p-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">
                      <FaUserMd className="me-2" />
                      {doctor.name}
                    </h5>
                    <p className="card-text mb-1">
                      <strong>Specialization:</strong> {doctor.specialization}
                    </p>
                    <p className="card-text mb-0">
                      <FaPhoneAlt className="me-2" />
                      {doctor.contact}
                    </p>
                  </div>
                  <div className="d-flex">
                  <button
                      onClick={() => handleView(doctor.doctorId)}
                      className="btn btn-outline-info btn-sm mx-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(doctor.doctorId)}
                      className="btn btn-outline-warning btn-sm mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.doctorId)}
                      className="btn btn-outline-danger btn-sm mx-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : <h1>No Records Found</h1> : (
          <p>Loading..</p>
        )}
      </div>
    </div>
  );
}

export default DoctorsCrud
