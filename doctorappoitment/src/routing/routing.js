
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
import PatientDoctorSearch from "../components/PatientDoctorSearch";
import PatientEditComponent from "../components/PatientEditComponent";
import DoctorDashBoard from "../components/DoctorDashBoard";
import DoctorDashUi from "../components/DoctorDashUi";
import DoctorDoctorSearch from "../components/DoctorDoctorSearch";
import DoctorEditComponent from "../components/DoctorEditComponent";
import NotFoundPage from "../components/NotFoundPage";
import EmergencyComp from "../components/EmergencyComp";
import Services from "../components/Services";
import ErrorBound from "../components/ErrorBound";
import ErrorBoundary from "../components/ErrorHandle";



const router = createBrowserRouter([
    {

        path : "/error-page",
        element :<ErrorBound/>
    },
    {
        path :"",
        element :  (
        <ErrorBoundary>

<App/>
        </ErrorBoundary>
        ),
        children : [
            {
                path:"",
                element:<LandingPageComponent/>
            },
            {
                path:"about-us",
                element:<AboutUsComponent/>
            },
            {
                path:"emergency",
                element:<EmergencyComp />
                
            },
            {
                path:"services",
                element:<Services />
                
            }

            
        ]
    },
{
path:"login",
element: (<ErrorBoundary><LoginComponent/> </ErrorBoundary>)
},

{
    path:"/doctor-register",
    element:(<ErrorBoundary><DoctorRegisteration/></ErrorBoundary>)
},
{
    path:"/patient-register",
    element:(<ErrorBoundary><PatientRegister/></ErrorBoundary>)
},

{
    path:"/patient-dash",
    
element : (
    <ErrorBoundary>

<PatientDashBoard/>
</ErrorBoundary>)
,
children : [{
path : "",
element :<PatientDashUi/>
},
{
path : "book-appointment",
element : <BookAppointmentComp/>
},
{
    path : "search-doctor",
    element : <PatientDoctorSearch/>
},

{
    path : "patient-bookings",
    element : <Patientbookings/>
},

{
    path : "medical-history",
    element : <PatientMedicalHistory/>
}
,
{
    path : "edit-profile",
    element :<PatientEditComponent/>
}


]
},
{
    path : "/doctor-dash",
    element :( <ErrorBoundary><DoctorDashBoard/></ErrorBoundary>) ,
    children : [

        {
            path : "",
            element : <Navigate to={"doctor-search"}/>
        },
        {
            path : "doctor-search",
            element : <DoctorDoctorSearch/>
        },
        {
            path : "doctor-bookings",
            element : <DoctorBookingList/>
        },
        {
            path : "medical-history/:id",
            element:<DoctorBookingMedicalHistory/>

        },
        {
            path : "doctor-edit",
            element : <DoctorEditComponent/>

        }
    ]

},


{
    path:"/admin",
   element:(<ErrorBoundary><AdminDashBoard/></ErrorBoundary>),
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
},
{
    path : "*",
    element  : <NotFoundPage/>
}


])



export default router;