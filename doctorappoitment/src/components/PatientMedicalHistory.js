import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PatientContext } from './PatientDashContext';
import DbService from '../Api/DbService';
import jsPDF from 'jspdf';

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

  const downloadPrescriptionAsPDF = (base64Image, patientName,doctorName,bookingDate) => {
    const pdf = new jsPDF();
  
    // Add the image to the PDF
    pdf.addImage(base64Image, 'JPEG', 15, 40, 180, 160); // Adjust the positioning and size of the image in the PDF
  
    // Save the generated PDF
    pdf.save(`${patientName}-${doctorName}-${bookingDate}_prescription.pdf`);
  };
const PatientMedicalHistory = () => { 
    const {id} = useContext(PatientContext)
    const [medicalHistory,setMedicalhistory] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);

    const getmedicalHistory = async ()=>{
        const response = await DbService.get(`Bookings/medicalhistory/${id}`,{},sessionStorage.getItem("token"))
        console.log(response.data.value["$values"])
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
          <div style={styles.container}>
            {medicalHistory ? medicalHistory.length >0 ? medicalHistory.map((item, index) => (
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
                <button
                onClick={() => downloadPrescriptionAsPDF(item.prescription, item.patientName,item.doctorName,item.bookingDate)}
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Download as PDF
              </button>
              </div>
            )):"No Records Found" :"loading.."}
          </div>
    
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

export default PatientMedicalHistory