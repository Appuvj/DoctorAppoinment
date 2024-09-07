import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// src={`data:image/jpeg;base64,${item.prescription}`}



const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    },
    info: {
      marginTop: '16px',
    },
  };

const DoctorBookingMedicalHistory = () => {
    const {id} = useParams()
    const [medicalHistory,setMedicalhistory] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);

    const getmedicalHistory = async ()=>{
        const response = await axios.get(`https://localhost:7146/api/Bookings/medicalhistory/${id}`)
        // console.log(response.data.value["$values"])
        setMedicalhistory(response.data.value["$values"])
    }

    useEffect(()=>{
        getmedicalHistory();
    },[])
    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleDateString(); // Get only the date in 'MM/DD/YYYY' format
      };
      const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
      };
    
      // Function to close the modal
      const handleCloseModal = () => {
        setSelectedImage(null);
      };
      return (
        <div>
          {/* Card List */}
          <div style={styles.container}>
            {medicalHistory ?  medicalHistory.map((item, index) => (
              <div key={index} style={styles.card}>
                <img
                  src={`data:image/jpeg;base64,${item.prescription}`}
                  alt={`Prescription of ${item.patientName}`}
                  style={styles.image}
                  onClick={() => handleImageClick(item.prescription)} // Open modal on image click
                />
                <div style={styles.info}>
                  <h3>Doctor: {item.doctorName}</h3>
                  <h4>Patient: {item.patientName}</h4>
                  <p>Visited Date: {formatDate(item.bookingDate)}</p>
                </div>
              </div>
            )):"loading.."}
          </div>
    
          {/* Bootstrap Modal */}
          {selectedImage && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Prescription Image</h5>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <img
                     src={`data:image/jpeg;base64,${selectedImage}`}
                      alt="Selected Prescription"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default DoctorBookingMedicalHistory