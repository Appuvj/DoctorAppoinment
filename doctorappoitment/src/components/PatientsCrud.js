import React, { useContext } from 'react'
import { AdminContext } from './AdminDashContext';

const PatientsCrud = () => {
    const { patients,fetchDatas } = useContext(AdminContext);

    return (
        <div>
            Patients
        </div>
    )
}

export default PatientsCrud
