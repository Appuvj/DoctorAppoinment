import React, { createContext, useState } from 'react';
import axios  from 'axios';
// Create a context with a default value
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [patients,setPatients] = useState()
    const [doctors,setDoctors] = useState()
    const [appoitments,setAppoitments] = useState()



    const fetchDatas = async () => {
        axios.get("https://localhost:7146/api/Doctor").then((res)=>
            
            {
            console.log(res.data["$values"])
            setDoctors(res.data["$values"])
     } ).catch((err)=> console.log(err)
        
)
    
        
            axios.get("https://localhost:7146/api/Patient").then((res)=>
            {
                console.log(res.data["$values"])
                setPatients(res.data["$values"])
            }
            ).catch((err)=> console.log(err))
        axios.get("https://localhost:7146/api/Bookings").then((res)=>
        {
            console.log(res.data["$values"])
     setAppoitments(res.data["$values"])   
    }).catch((err)=> console.log(err))

    }



    useState(async ()=>{
       

await fetchDatas();

    },[])





    return (
        <AdminContext.Provider value={{patients,doctors,appoitments,fetchDatas}}>
            {children}
        </AdminContext.Provider>
    );
};