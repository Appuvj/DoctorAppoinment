import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaFileUpload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';








const BookingCard = ({ booking, onComplete }) => {
    // console.log(booking)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Adjust to your preferred date format
    };
  
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(true);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      const validFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  
      if (file && validFileTypes.includes(file.type)) {
        setFile(file);
        setUploading(false);
      } else {
        alert('Invalid file type. Please upload an image (PNG, JPEG) or PDF.');
        e.target.value = ''; // Clear the input
      }
    
    };
  
    const handleUpload = () => {
      if (!file) {
        alert("Please upload a prescription file.");
        return;
      }
      setUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setUploading(false);
        // File uploaded successfully
        // The "Mark as Completed" button can now be enabled
      }, 1000);
    };
  
    const handleComplete = () => {
      if (!file) {
        alert("Please upload a prescription file before marking as completed.");
        return;
      }
      onComplete(booking.bookingId); // Call the onComplete callback with booking ID
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
                  accept=".png, .jpg, .jpeg, .pdf"
                  onChange={handleFileChange}
                  style={styles.fileInput}
                />
                <button
                  disabled={uploading}
                  style={styles.uploadButton}
                >
                  {uploading ? <><FaFileUpload /> Upload Prescription </>: 'Uploaded'  }
                </button>
              </div>
              {/* {console.log(booking.bookingId)} */}
              <button
                onClick={()=>handleComplete(booking.bookingId)}
                style={styles.button}
              >
                <FaCheckCircle /> Mark as Completed
              </button>
            </>
          )}
        </div>
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

  const BookingList = ({ bookings }) => {
    const handleComplete = (bookingId) => {
      // Logic to mark the appointment as completed
      console.log(`Appointment ${bookingId} marked as completed.`);
    };
  
    return (
      <div style={styles.container}>
        {bookings.map((booking) => {
            if (booking.status.toLowerCase() === 'booked')
            {
            
          return <BookingCard key={booking.bookingId} booking={booking} onComplete={handleComplete} />

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
  
    useEffect(() => {
      fetchDoctorData();
    }, [id]);
  
    return (
      <>
        <div>Doctor Booking List</div>
        {DoctorBookingData ? (
          <BookingList bookings={DoctorBookingData.bookings["$values"]} />
        ) : (
          "No bookings available."
        )}
      </>
    );
}

export default DoctorBookingList