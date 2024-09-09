
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
import LoginComponent from "../components/LoginComponent";
import DoctorBookingList from "../components/DoctorBookingList";
import DoctorBookingMedicalHistory from "../components/DoctorBookingMedicalHistory";
import PatientMedicalHistory from "../components/PatientMedicalHistory";
import Patientbookings from "../components/Patientbookings";
import LandingPageComponent from "../components/LandingPageComponent";
import App from "../App";
import AboutUsComponent from "../components/AboutUsComponent";
import PatientDashBoard from "../components/PatientDashBoard";
import PatientDashUi from "../components/PatientDashUi";
import BookAppointmentComp from "../components/BookAppointmentComp";


const router = createBrowserRouter([
    {
        path :"",
        element : <App/>,
        children : [
            {
                path:"",
                element:<LandingPageComponent/>
            },
            {
                path:"about-us",
                element:<AboutUsComponent/>
            }
        ]
    },
{
path:"login",
element:<LoginComponent/>
},

{
    path:"/doctor-register",
    element:<DoctorRegisteration/>
},
{
    path:"/patient-register",
    element:<PatientRegister/>
},

{
    path:"/patient-dash",
element : <PatientDashBoard/>,
children : [{
path : "",
element :<PatientDashUi/>
},
{
element : "book-appointment",
element : <BookAppointmentComp/>
}



]
},
    {
        path:"/patientbookings/:id",
        element:<Patientbookings/>

    },

    {
        path:"/patient/medicalHistory/:id",
        element:<PatientMedicalHistory/>
    },
    {
        path:"/doctor-bookings/MedicalHistory/:id",
        element:<DoctorBookingMedicalHistory/>

    },
    {
        path:"/doctor-bookings/:id",
        element:<DoctorBookingList/>

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