import React, { useContext } from 'react'
import { AdminContext } from './AdminDashContext';
import { FaUser, FaUserMd, FaCalendarAlt, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';

const AnalyticsDataUi = () => {
    const { analyticsData,fetchDatas } = useContext(AdminContext);

  return (
    <div className='d-flex align-items-center justify-content-center h-100 mt-5'>
    <div className="row gx-4 gy-4">
  <div className="col-md-4">
    <div className="card text-white bg-primary mb-3">
      <div className="card-body d-flex align-items-center">
        <FaUser size={50} className="me-3" />
        <div>
          <h5 className="card-title">Patients Count</h5>
          <p className="card-text">{analyticsData ? analyticsData.patientsCount : "loading.."}</p>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-white bg-success mb-3">
      <div className="card-body d-flex align-items-center">
        <FaUserMd size={50} className="me-3" />
        <div>
          <h5 className="card-title">Doctors Count</h5>
          <p className="card-text">{analyticsData ? analyticsData.doctorsCount : "loading.."}</p>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-white bg-info mb-3">
      <div className="card-body d-flex align-items-center">
        <FaCalendarAlt size={50} className="me-3" />
        <div>
          <h5 className="card-title">Total Appointments</h5>
          <p className="card-text">{analyticsData ? analyticsData.totalAppointments : "loading.."}</p>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-white bg-warning mb-3">
      <div className="card-body d-flex align-items-center">
        <FaClipboardCheck size={50} className="me-3" />
        <div>
          <h5 className="card-title">Pending Appointments</h5>
          <p className="card-text">{analyticsData ? analyticsData.pendingAppointments : "loading.."}</p>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-white bg-secondary mb-3">
      <div className="card-body d-flex align-items-center">
        <FaCalendarAlt size={50} className="me-3" />
        <div>
          <h5 className="card-title">Booked Appointments</h5>
          <p className="card-text">{analyticsData ? analyticsData.bookedAppointments : "loading.."}</p>
        </div>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-Info bg-light mb-3">
      <div className="card-body d-flex align-items-center">
        <FaCheckCircle size={50} className="me-3" />
        <div>
          <h5 className="card-title">Completed Appointments</h5>
          <p className="card-text">{analyticsData ? analyticsData.completedAppointments : "loading.."}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default AnalyticsDataUi