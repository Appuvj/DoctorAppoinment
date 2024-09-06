
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminDashBoard from "../components/AdminDashBoard";
import PatientsCrud from "../components/PatientsCrud";
import DoctorsCrud from "../components/DoctorsCrud";
import AppoimentsCrud from "../components/AppoimentsCrud";
import AdminDashUi from "../components/AdminDashUi";
import AnalyticsDataUi from "../components/AnalyticsDataUi";
import PatientAdminEdit from "../components/PatientAdminEdit";
import DoctorAdminCrud from "../components/DoctorAdminCrud";
import PatientAdminView from "../components/PatientAdminView";
import DoctorAdminView from "../components/DoctorAdminView";
import DoctorRegisteration from "../components/DoctorRegisteration";
import PatientRegister from "../components/PatientRegister";


const router = createBrowserRouter([
    {
        path:"/doctor-register",
        element:<DoctorRegisteration/>
    },
    {
        path:"/patient-register",
        element:<PatientRegister/>
    },

{
    path:"/admin",
   element:<AdminDashBoard/>,
children : [

{
path:"",
element:<Navigate to={"dashboard"}/>
},

{
path:"dashboard",
element:<AdminDashUi/>,
children:[
    {
path:"",
element:<Navigate to={"analytics"}/>
    },
{
path:"analytics",
element:<AnalyticsDataUi/>
},
    {
        path:"patients",
        element :<PatientsCrud/>
    },
    
    {
        path:"doctors",
        element :<DoctorsCrud/>
    },
    {
        path:"appointments",
        element :<AppoimentsCrud/>
    },
    {
        path :"patients/:id",
        element:<PatientAdminEdit/>
    },
    {
        path : "doctors/:id",
        element : <DoctorAdminCrud/>
    },
    {
        path : "patientview/:id",
        element : <PatientAdminView/>
    },
    {
        path : "doctorview/:id",
        element : <DoctorAdminView/>

    }



]
},

]
}


])



export default router;