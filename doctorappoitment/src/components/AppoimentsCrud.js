import React, { useContext } from 'react'
import { AdminContext } from './AdminDashContext';

const AppoimentsCrud = () => {
    const { appoitments,fetchDatas } = useContext(AdminContext);

    return (
        <div>
            Appoinments
        </div>
    )
}

export default AppoimentsCrud
