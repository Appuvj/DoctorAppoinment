import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const PatientsCrud = () => {



   const { patients, fetchDatas } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleShow = () => {
    setShowModal(true);
    setConfirmed(false);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmDelete = () => setConfirmed(true);

  // Handle patient deletion
  useEffect(() => {
    if (confirmed && modelData.Id) {
      axios
        .delete(`https://localhost:7146/api/Patient/${modelData.Id}`)
        .then((res) => {
          // console.log(res);
          fetchDatas(); // Refresh patient list after deletion
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setConfirmed(false);
          handleClose();
        });
    }
  }, [confirmed, modelData.Id, fetchDatas]);

  const handleDelete = (patientId) => {
    const foundPatient = patients.find((patient) => patient.patientId === patientId);
    if (foundPatient) {
      setModelData({ name: foundPatient.name, Id: foundPatient.patientId });
      handleShow();
    }
  };
const navigate = useNavigate();
  const handleEdit = (patientId) => {
    navigate(`${patientId}`)
  };


const handleView = (patientId) => {
  navigate(`/admin/dashboard/patientview/${patientId}`)
}



  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Are You Sure?</h5>
                <button type="button" className="close ms-auto" onClick={handleClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modelData.name ? modelData.name : "Loading..."}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show" aria-hidden="true"></div>}

      <h2>Patients List</h2>
      <div className="row">
        {patients ?   patients.length>0 ? (
          patients.map((patient) => (
            <div key={patient.patientId} className="col-12 col-md-6 mb-3">
              <div className="card p-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{patient.name}</h5>
                    <p className="card-text mb-1"><strong>Email:</strong> {patient.email}</p>
                    <p className="card-text mb-0"><strong>Contact:</strong> {patient.contact}</p>
                  </div>
                  <div className="d-flex">
                  <button onClick={() => handleView(patient.patientId)} className="btn btn-outline-info btn-sm mx-1">
                      View
                    </button>
                    <button onClick={() => handleEdit(patient.patientId)} className="btn btn-outline-warning btn-sm mx-1">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(patient.patientId)} className="btn btn-outline-danger btn-sm mx-1">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : <h1>No Records Found </h1> : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default PatientsCrud
