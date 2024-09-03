import React from 'react'
import { useContext } from 'react';
import { AdminContext } from './AdminDashContext';

const DoctorsCrud = () => {

    const { doctors,fetchDatas } = useContext(AdminContext);

    return (
        <div>
            Doctors
        </div>
    )
}

export default DoctorsCrud
