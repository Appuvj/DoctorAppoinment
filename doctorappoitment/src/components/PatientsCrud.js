import React, { useContext, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientsCrud = () => {
    const { patients,fetchDatas } = useContext(AdminContext);
    const [showModal, setShowModal] = useState(false);
    const[modelData,setModelData] = useState([])
    const [confiremed ,setConfirmed] = useState(false)


    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleconfirmDelete = () => setConfirmed(true)
    const handleEdit = (patientId) => {
        // Implement your edit logic here
      };
    
      const handleDelete = (patientId) => {
        // Implement your delete logic here
        const found = patients.find((patient)=> patient.patientId == patientId)
        setModelData({
            "name" : found.name
        })
        handleShow()

        if(confiremed)
        {
        axios.delete("hii").then((res)=> console.log(res)).catch((err)=>console.log(err))
        setConfirmed(false)
        }
      };
    return (
        <div>
           
           <div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Are You Sure ?</h5>
                                <button 
                                  type="button" 
                                  className="close ms-auto" 
                                  onClick={handleClose} 
                                  aria-label="Close"
                                >
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
<button type="button" className="btn btn-danger" onClick={handleconfirmDelete}>
    Confirm
</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop */}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
        <h2>Patients List</h2>
        <div className="row">
          {patients ? (
            patients.map((patient) => (
              <div key={patient.id} className="col-12 col-md-6 mb-3">
                <div className="card p-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">{patient.name}</h5>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {patient.email}
                      </p>
                      <p className="card-text mb-0">
                        <strong>Contact:</strong> {patient.contact}
                      </p>
                    </div>
                    <div className="d-flex">
                      <button
                        onClick={() => handleEdit(patient.patientId)}
                        className="btn btn-outline-warning btn-sm mx-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient.patientId)}
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
            <p>Loading...</p>
          )}
        </div>
      </div>
  
    )
}

export default PatientsCrud
