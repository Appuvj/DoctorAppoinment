
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminDashBoard from "../components/AdminDashBoard";
import PatientsCrud from "../components/PatientsCrud";
import DoctorsCrud from "../components/DoctorsCrud";
import AppoimentsCrud from "../components/AppoimentsCrud";
import AdminDashUi from "../components/AdminDashUi";
import AnalyticsDataUi from "../components/AnalyticsDataUi";


const router = createBrowserRouter([

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
    }



]
},

]
}


])



export default router;