import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AdminContext, AdminProvider } from './AdminDashContext';
const AdminDashBoard = () => {

    // const { theme, toggleTheme } = useContext(AdminContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(! sessionStorage.getItem("Admin")){
            navigate("/login")
          }
    },[])


    return (
<>
        {sessionStorage.getItem("Admin") &&   <AdminProvider>
            <Outlet/>
         </AdminProvider>}
         </>
    )
}

export default AdminDashBoard
