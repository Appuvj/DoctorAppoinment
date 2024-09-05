import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../App.css';
import { AdminContext } from './AdminDashContext';
import { FaHome, FaUserMd, FaUsers, FaCalendarCheck, FaEdit } from 'react-icons/fa';
import { FaChartBar, FaChartPie } from 'react-icons/fa';



const AdminDashUi = () => {

  const { analyticsData,fetchDatas } = useContext(AdminContext);

    return (

      
    //   <div className="container-fluid">
    //   <div className="row">
    //     {/* Sidebar */}
    //     <nav id="sidebar" className="col-md-3 col-lg-2 bg-light sidebar p-4">
    //       <h4 className="text-center mb-4">Admin Dashboard</h4>
    //       <div className="d-grid gap-2">
    //         <Link to="/admin/patients" className="btn btn-primary">
    //           Patients
    //         </Link>
    //         <Link to="/admin/doctors" className="btn btn-success">
    //           Doctors
    //         </Link>
    //         <Link to="/admin/appointments" className="btn btn-info">
    //           Appointments
    //         </Link>
    //         <Link to="/admin" className="btn btn-info">
    //           Anayltics
    //         </Link>
    //       </div>
    //     </nav>

    //     {/* Main Content */}
    //     <main className="col-md-9 col-lg-10 ml-sm-auto px-4">
    //       <h1 className="h2">Dashboard Content</h1>
    //       <p>Welcome to the admin dashboard. Here you can manage patients, doctors, and appointments.</p>
          
    //       {/* Add more content as needed */}
    //       <div className="container">
    //   <h2>Dashboard Analytics</h2>
    //   <table className="table table-striped">
    //     <thead>
    //       <tr>
    //         <th>Statistic</th>
    //         <th>Value</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>Patients Count</td>
    //         <td>{analyticsData.patientsCount}</td>
    //       </tr>
    //       <tr>
    //         <td>Doctors Count</td>
    //         <td>{analyticsData.doctorsCount}</td>
    //       </tr>
    //       <tr>
    //         <td>Total Appointments</td>
    //         <td>{analyticsData.totalAppointments}</td>
    //       </tr>
    //       <tr>
    //         <td>Pending Appointments</td>
    //         <td>{analyticsData.pendingAppointments}</td>
    //       </tr>
    //       <tr>
    //         <td>Booked Appointments</td>
    //         <td>{analyticsData.bookedAppointments}</td>
    //       </tr>
    //       <tr>
    //         <td>Completed Appointments</td>
    //         <td>{analyticsData.completedAppointments}</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
          
    //     </main>
    //   </div>
    // </div>
 <>
 <div className="px-3 py-2 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use href="#bootstrap"></use></svg>
          </a>

          <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
  <li>
    <Link to="analytics" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1.2rem' }}>
      <FaChartBar size={28} style={{ color: '#f8f9fa' }} /> Analytics 
    </Link>
  </li>
  <li>
    <Link to="doctors" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1.2rem' }}>
      <FaUserMd size={28} style={{ color: '#f8f9fa' }} />
      Doctors
    </Link>
  </li>
  <li>
    <Link to="patients" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1.2rem' }}>
      <FaUsers size={28} style={{ color: '#f8f9fa' }} />
      Patients
    </Link>
  </li>
  <li>
    <Link to="appointments" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1.2rem' }}>
      <FaCalendarCheck size={28} style={{ color: '#f8f9fa' }} />
      Appointments
    </Link>
  </li>

</ul>

           
         
         
        </div>
      </div>
    </div>
    <div>
    <Outlet/>

    </div>
 </>
    )
}

export default AdminDashUi
