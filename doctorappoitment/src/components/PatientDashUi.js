import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PatientContext } from './PatientDashContext';

  
const PatientDashUi = () => {



    const navigate = useNavigate()

    const { patients,id, doctorsList,organizations,locations,selectedDoctor,setSelectedDoctor, fetchDatas ,fetchDoctors,filteredDoctors, setFilteredDoctors,specializations, setSpecializations

        , setOrganizations, setLocations,filters, setFilters } = useContext(PatientContext);

    const [searching,setSearching] = useState()

    
    // const [filters, setFilters] = useState({
    //     location: '',
    //     specialization: '',
    //     organization: '',
    //     gender: ''
    //   });

useEffect(()=>{
    if(searching )
        {
            const searches = searching.split(",")
           
            searches.forEach(function(val, index) {
                // console.log(val + "val")
                if(locations.includes(val))
                {
                    setFilters((prev)=> {
                        return {
                            ...prev,
                            "location" : val
                        }
                    })
                }
                else if(organizations.includes(val))
                {
                    setFilters((prev)=> {
                        return {
                            ...prev,
                            "organization" : val
                        }
                    })
                }
                else if(specializations.includes(val))
                {
                    setFilters((prev)=> {
                        return {
                            ...prev,
                            "specialization" : val
                        }
                    })  
                }
              });
    
            
    
        }
},[searching])


   const  handleChange = (e)=>{
    setSearching(e.target.value)
   
  

}

   return(
    <div className="book-appoint-container">
    {/* Banner Section */}
    <div className="banner-container">
      <div className="banner-content">
        <h1 className="banner-title">Book an Appointment</h1>
        <p className="banner-description">
          Search for doctors by name, specialty, or condition from our comprehensive list of healthcare experts.
        </p>
      </div>
      <div className="banner-image-container">
        <img
          id="banner-image"
          alt="Book an Appointment"
          className="banner-image"
          src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/November2023/zlyTf662xOu1m25PAfVv.webp?w=1920&q=100"
        />
      </div>
    </div>

    {/* Search Section */}
    <div className="search-container">
      <h2 className="search-title">I’m Looking For</h2>

      <div className="search-box-container">
        <input
          type="text"
          className="search-input"
          placeholder="Specialty, Location, Hospital"
            value = {searching}
          onChange={handleChange}
        />
        <button className="search-button" onClick={()=> navigate("search-doctor")}>
          Search
        </button>
      </div>
    </div>
  </div>
   )
}

export default PatientDashUi
