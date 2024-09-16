import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PatientContext } from './PatientDashContext';

const PatientDashUi = () => {
    const navigate = useNavigate()
    const { locations, organizations, specializations, setFilters } = useContext(PatientContext);
    const [searching, setSearching] = useState('')

    useEffect(() => {
        if (searching) {
            const searches = searching.split(",")
            searches.forEach(val => {
                if (locations.includes(val)) {
                    setFilters(prev => ({ ...prev, location: val }))
                } else if (organizations.includes(val)) {
                    setFilters(prev => ({ ...prev, organization: val }))
                } else if (specializations.includes(val)) {
                    setFilters(prev => ({ ...prev, specialization: val }))
                }
            });
        }
    }, [searching, locations, organizations, specializations, setFilters])

    const handleChange = (e) => {
        setSearching(e.target.value)
    }

    return (
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
                        value={searching}
                        onChange={handleChange}
                    />
                    <button className="search-button" onClick={() => navigate("search-doctor")}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PatientDashUi
