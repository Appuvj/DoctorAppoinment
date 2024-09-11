import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../App.css';
import { AdminContext } from './AdminDashContext';

import { FaUserMd, FaUsers, FaCalendarCheck, FaChartBar, FaSignOutAlt } from 'react-icons/fa';



const AdminDashUi = () => {

  const { analyticsData,fetchDatas } = useContext(AdminContext);
 const navigate = useNavigate()
 const logout = () =>{
navigate("/login")
 }

    return (

      
      <>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <Link to="analytics" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1rem' }}>
                  <FaChartBar size={24} style={{ color: '#f8f9fa' }} /> Analytics
                </Link>
              </li>
              <li>
                <Link to="doctors" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1rem' }}>
                  <FaUserMd size={24} style={{ color: '#f8f9fa' }} /> Doctors
                </Link>
              </li>
              <li>
                <Link to="patients" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1rem' }}>
                  <FaUsers size={24} style={{ color: '#f8f9fa' }} /> Patients
                </Link>
              </li>
              <li>
                <Link to="appointments" className="nav-link text-secondary" style={{ color: '#ffffff', fontSize: '1rem' }}>
                  <FaCalendarCheck size={24} style={{ color: '#f8f9fa' }} /> Appointments
                </Link>
              </li>
            </ul>

        
            <div className="d-flex align-items-center">
            
              <button
                onClick={logout}
                className="btn btn-outline-light"
                style={{ fontSize: '1rem' }}
              >
                <FaSignOutAlt size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
    )
}

export default AdminDashUi
