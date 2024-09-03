import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AdminContext, AdminProvider } from './AdminDashContext';
const AdminDashBoard = () => {

    // const { theme, toggleTheme } = useContext(AdminContext);



    return (
        <AdminProvider>
       <Outlet/>
    </AdminProvider>
    )
}

export default AdminDashBoard
