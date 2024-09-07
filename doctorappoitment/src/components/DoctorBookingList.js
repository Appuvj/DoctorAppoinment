import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaCheckCircle, FaFileUpload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';








const BookingCard = ({ booking, onComplete ,submitData}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust to your preferred date format
  };

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Modal message

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selectedFile && validFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setUploading(false);
    } else {
      setModalMessage('Invalid file type. Please upload an image (PNG, JPEG) or PDF.');
      setShowModal(true); // Show modal with error message
      e.target.value = ''; // Clear the input
    }
  };

  const handleUpload = () => {
    if (!file) {
      setModalMessage("Please upload a prescription file.");
      setShowModal(true);
      return;
    }
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      // File uploaded successfully
    }, 1000);
  };

  const handleComplete = () => {
    if (!file) {
      setModalMessage("Please upload a prescription file before marking as completed.");
      setShowModal(true);
      return;
    }
    submitData(booking,file); // Call the onComplete callback with booking ID
  };

  const Base64Image = ({ base64String }) => {
    const imageSrc = `data:image/png;base64,${base64String}`;
    return (
      <img src={imageSrc} alt="Converted" style={{ width: '100px', height: '100px' }} />
    );
  };

  return (
    <div style={styles.card}>
      <Base64Image base64String={booking.patientImage} />
      <div style={styles.details}>
        <h3>{booking.patientName}</h3>
        <p>Status: {booking.status}</p>
        <p>Date: {formatDate(booking.bookingDate)}</p>
        {booking.status.toLowerCase() === 'booked' && (
          <>
            <div style={styles.uploadContainer}>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                style={styles.fileInput}
              />
              <button
                disabled={uploading}
                onClick={handleUpload}
                style={styles.uploadButton}
              >
                {uploading ? <><FaFileUpload /> Uploading...</> : 'Upload Prescription'}
              </button>
            </div>
            <button
              onClick={handleComplete}
              style={styles.button}
            >
              <FaCheckCircle /> Mark as Completed
            </button>
          </>
        )}
      </div>

      {/* Modal for displaying messages */}
      <div
        className="modal fade show"
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Error</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
                style={{ marginLeft: 'auto' }} // Aligns the button to the right
              ></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompletedCard = ({ booking}) => {
  console.log(booking)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust to your preferred date format
  };

  const [showModal, setShowModal] = useState(false);  // Modal visibility state

  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);



 
 

  const Base64Image = ({ base64String }) => {
    const imageSrc = `data:image/png;base64,${base64String}`;
    return (
      <img src={imageSrc} alt="Converted" style={{ width: '100px', height: '100px' }} />
    );
  };

  return (
    <div style={styles.card}>
      <Base64Image base64String={booking.patientImage} />
      <div style={styles.details}>
        <h3>{booking.patientName}</h3>
        <p>Status: {booking.status}</p>
        <p>Date: {formatDate(booking.bookingDate)}</p>
        {booking.status.toLowerCase() === 'completed' && (
          <>
     {/* Replace Image with Button */}
     <button onClick={handleShowModal} style={styles.button}>
              View Prescription
            </button>

            {/* Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Prescription</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={`data:image/png;base64,${booking.prescription}`}
                  alt="Prescription"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>

      {/* Modal for displaying messages */}
   
    </div>
  );
};
const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  details: {
    flex: 1,
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  uploadContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  uploadButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
};

  const BookingList =({ bookings,submitData }) => {
    const handleComplete =(booking,file) => {
      // Logic to mark the appointment as completed
      console.log(`Appointment ${booking.bookingId} marked as completed.`);

    

    };
  
    return (
      <div style={styles.container}>
        {bookings.map((booking) => {
            if (booking.status.toLowerCase() === 'booked')
            {
            
          return <BookingCard key={booking.bookingId} booking={booking} onComplete={handleComplete} submitData = {submitData} />

            }
  })}
      </div>
    );
  };
  

  const CompletedList = ({ bookings }) => {
   
  
    return (
      <div style={styles.container}>
        {bookings.map((booking) => {
            if (booking.status.toLowerCase() === 'completed')
            {
            
          return <CompletedCard key={booking.bookingId} booking={booking}  />

            }
  })}
      </div>
    );
  };
  



const DoctorBookingList = () => {

    const { id } = useParams();
    const [DoctorBookingData, SetDoctorbookingData] = useState(null);
  
    const fetchDoctorData = async () => {
      const apiUrl = `https://localhost:7146/api/Doctor/${id}`;
      try {
        const response = await axios.get(apiUrl);
        SetDoctorbookingData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    const submitData = async (booking,file) =>{
      console.log(booking)
      const formData = new FormData();
      formData.append('BookingDate',booking.bookingDate);  // Append date-time as string
      formData.append('Status', 'Completed');
      formData.append('DoctorId', parseInt(booking.doctorId));  // Ensure it's an integer
      formData.append('PatientId', parseInt(booking.patientId));
      formData.append('Prescription', file);  // Append file (binary data)
      console.log(formData)
      try {
        // Make PUT request with FormData
        const response = await axios.put(`https://localhost:7146/api/bookings/${booking.bookingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Handle success
        console.log('Booking updated successfully:', response.data);
      } catch (error) {
        // Handle error
        console.error('Error updating booking:', error);
      }
    }
    useEffect(() => {
      fetchDoctorData();
    }, [id]);
  
    return (
      <>
        <div>Doctor Booking List</div>
        {DoctorBookingData ? (
          <BookingList bookings={DoctorBookingData.bookings["$values"]} submitData = {submitData}/>
        ) : (
          "No bookings available."
        )}
        <div>Doctor Completed List</div>
        {DoctorBookingData ? (
          <CompletedList bookings={DoctorBookingData.bookings["$values"]} />
        ) : (
          "No data available."
        )}
      </>
    );
}

export default DoctorBookingList