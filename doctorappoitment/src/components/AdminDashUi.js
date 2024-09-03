import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashUi = () => {
    return (
        <div className="container-fluid">
        <div className="row">
           
            <nav id="sidebar" className="col-md-3 col-lg-2 sidebar">
                <h4 className="text-center mb-4">Admin Dashboard</h4>
                <div className="d-grid gap-2">
            <Link to="/admin/patients" className="btn btn-primary">
                Patients
            </Link>
            <Link to="/admin/doctors" className="btn btn-success">
                Doctors
            </Link>
            <Link to="/admin/appointments" className="btn btn-info">
                Appointments
            </Link>
        </div>
            </nav>
       
          
        </div>
    </div>
    )
}

export default AdminDashUi
