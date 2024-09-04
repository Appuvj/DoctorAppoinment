import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from './AdminDashContext';
import { FaCheck, FaTimes, FaCalendarAlt, FaCalendarCheck ,FaBan} from 'react-icons/fa';

const AppoimentsCrud = () => {
    const { appoitments,fetchDatas } = useContext(AdminContext);
    const [orderedAppointments, setOrderedAppointments] = useState([]);

    const [pendingAppoitments,setPendingAppoitments] = useState([]) 
    const [bookedAppoitments,setBookedAppoitments] = useState([])
    const [completedAppoitments,setCompletedAppoitments] = useState([]) 
    const [cancelledAppointments, setCancelledAppointments] = useState([]);



    useEffect(() => {
        if(appoitments)
        {
            
            console.log(appoitments)
            setPendingAppoitments(appoitments.filter((appointment)=> appointment.status=="pending"))
            setBookedAppoitments(appoitments.filter((appointment)=> appointment.status=="booked"))
            setCompletedAppoitments(appoitments.filter((appointment)=> appointment.status=="completed"))
            setCancelledAppointments(appoitments.filter(appointment => appointment.status === "cancelled"));


    }
    }, [appoitments]);



    const handleConfirm = (id) => {
        // Implement confirm logic
    };

    const handleCancel = (id) => {
        // Implement cancel logic
    };
    return (
        <div>
            <h2>Appointments List</h2>

            <div className="mb-4">
                <h3 className="text-warning">
                    <FaCalendarAlt className="me-2" /> Pending Appointments
                </h3>
                <ul className="list-group">
                    {pendingAppoitments ? pendingAppoitments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Patient:</strong> {appointment.patientName} <br />
                                <strong>Doctor:</strong> {appointment.doctorName} <br />
                                <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()}
                            </div>
                            <div className="btn-group">
                                <button
                                    onClick={() => handleConfirm(appointment.bookingId)}
                                    className="btn btn-success btn-sm"
                                >
                                    <FaCheck className="me-1" /> Confirm
                                </button>
                                <button
                                    onClick={() => handleCancel(appointment.bookingId)}
                                    className="btn btn-danger btn-sm"
                                >
                                    <FaTimes className="me-1" /> Cancel
                                </button>
                            </div>
                        </li>
                    )) : "Loading..."}
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="text-primary">
                    <FaCalendarCheck className="me-2" /> Booked Appointments
                </h3>
                <ul className="list-group">
                    {bookedAppoitments? bookedAppoitments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item">
                            <strong>Patient:</strong> {appointment.patientName} <br />
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                            <strong>Status:</strong> {appointment.status}
                        </li>
                    )) : "Loading..."}
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="text-success">
                    <FaCalendarCheck className="me-2" /> Completed Appointments
                </h3>
                <ul className="list-group">
                    {completedAppoitments ? completedAppoitments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item">
                            <strong>Patient:</strong> {appointment.patientName} <br />
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                            <strong>Status:</strong> {appointment.status}
                        </li>
                    )) : "Loading..."}
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="text-danger">
                    <FaBan className="me-2" /> Cancelled Appointments
                </h3>
                <ul className="list-group">
                    {cancelledAppointments? cancelledAppointments.map((appointment) => (
                        <li key={appointment.bookingId} className="list-group-item">
                            <strong>Patient:</strong> {appointment.patientName} <br />
                            <strong>Doctor:</strong> {appointment.doctorName} <br />
                            <strong>Booked Time:</strong> {new Date(appointment.bookingDate).toLocaleString()} <br />
                            <strong>Status:</strong> {appointment.status}
                        </li>
                    )) : "Loading..."}
                </ul>
            </div>
        </div>
    )
}

export default AppoimentsCrud
