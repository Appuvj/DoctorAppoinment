import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import { FaCheck, FaTimes, FaCalendarAlt, FaCalendarCheck ,FaBan} from 'react-icons/fa';
import axios from "axios"
const AppoimentsCrud = () => {
    const { appointments, fetchDatas } = useContext(AdminContext);
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [cancelledAppointments, setCancelledAppointments] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(""); // "confirm" or "cancel"
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        if (appointments) {
            console.log(appointments)
            setPendingAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "pending" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
              
              setBookedAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "booked" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
              
              setCompletedAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "completed" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
              
              setCancelledAppointments(
                appointments.filter(
                  appointment => 
                    appointment.status.toLowerCase() === "cancelled" && 
                    appointment.patientName && 
                    appointment.doctorName
                )
              );
        }
    }, [appointments]);

    const handleAction =async (appointment, action) => {
        setSelectedAppointment(appointment);
        setModalAction(action);
        setShowModal(true);
        // if(action === "confirm"){
        // axios.put(`https://localhost:7146/api/Bookings/${appointment.bookingId}`,{
        //     "bookingDate": appointment.bookingDate,
        //     "status": "Booked",
        //     "doctorId": appointment.doctorId,
        //     "patientId": appointment.patientId
        //   }).then((res)=>console.log(res)).catch((err)=>console.log(err))
        // }
        // else {
        //     axios.put(`https://localhost:7146/api/Bookings/${appointment.bookingId}`,{
        //         "bookingDate": appointment.bookingDate,
        //         "status": "Cancelled",
        //         "doctorId": appointment.doctorId,
        //         "patientId": appointment.patientId
        //       }).then((res)=>console.log(res)).catch((err)=>console.log(err))
                
        // }

       

    
        
    };

    const handleModalConfirm = () => {
        if (selectedAppointment && modalAction) {
            const updatedStatus = modalAction === "confirm" ? "Booked" : "Cancelled";
            console.log(selectedAppointment)
            axios.put(`https://localhost:7146/api/Bookings/${selectedAppointment.bookingId}`, {
                       
                         "status": updatedStatus,
                            "DoctorId" : 0
                         ,"PatientId" :0
                     }).then((res) => {
                setShowModal(false);
                fetchDatas(); // Refetch data to update the list
            }).catch((err) => {
                console.log(err);
                setShowModal(false);
            });
        }
    };

    return (
        <div>
            <h2>Appointments List</h2>

            {/* Pending Appointments */}
            <div className="mb-4">
                <h3 className="text-warning">
                    <FaCalendarAlt className="me-2" /> Pending Appointments
                </h3>
                <ul className="list-group">
                    {pendingAppointments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Patient:</strong> {appointment.patientName} <br />
                                <strong>Doctor:</strong> {appointment.doctorName} <br />
                                <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()}
                            </div>
                            <div className="btn-group">
                                <button
                                    onClick={() => handleAction(appointment, "confirm")}
                                    className="btn btn-success btn-sm"
                                >
                                    <FaCheck className="me-1" /> Confirm
                                </button>
                                <button
                                    onClick={() => handleAction(appointment, "cancel")}
                                    className="btn btn-danger btn-sm"
                                >
                                    <FaTimes className="me-1" /> Cancel
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Booked Appointments */}
            <div className="mb-4">
                <h3 className="text-primary">
                    <FaCalendarCheck className="me-2" /> Booked Appointments
                </h3>
                <ul className="list-group">
                    {bookedAppointments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item">
                            <strong>Patient:</strong> {appointment.patientName} <br />
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                            <strong>Status:</strong> {appointment.status}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Completed Appointments */}
            <div className="mb-4">
                <h3 className="text-success">
                    <FaCalendarCheck className="me-2" /> Completed Appointments
                </h3>
                <ul className="list-group">
                    {completedAppointments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item">
                            <strong>Patient:</strong> {appointment.patientName} <br />
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                            <strong>Status:</strong> {appointment.status}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cancelled Appointments */}
            <div className="mb-4">
                <h3 className="text-danger">
                    <FaBan className="me-2" /> Cancelled Appointments
                </h3>
                <ul className="list-group">
                    {cancelledAppointments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item">
                            <strong>Patient:</strong> {appointment.patientName} <br />
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                            <strong>Status:</strong> {appointment.status}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalAction === "confirm" ? "Confirm Appointment" : "Cancel Appointment"}
                                </h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to {modalAction} this appointment?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleModalConfirm}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AppoimentsCrud
