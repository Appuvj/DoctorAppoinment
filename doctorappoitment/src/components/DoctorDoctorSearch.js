import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Button, Pagination, Box } from '@mui/material';
import { DoctorContext } from './DoctorDashContext';

// FilterDropdown component definition
const FilterDropdown = ({ title, options, selectedOption, setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close dropdown on selection
    };

    return (
        <div className="filter--item">
            <span 
                className={`filter--tab ${selectedOption ? 'active-filter' : ''}`} // Highlight if selected
                onClick={toggleDropdown}
            >
                <span>{title}</span>
                <span className="filter--arrow">{isOpen ? '▲' : '▼'}</span>
            </span>
            {isOpen && (
                <div className="filter--dropdown">
                    {options.map((option, index) => (
                        <div 
                            key={index} 
                            className={`filter--dropdown-item ${selectedOption === option ? 'selected' : ''}`} 
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// DoctorCard component definition
const DoctorCard = ({ doctor, sethandle }) => {
    return (
        <div className="doctor--card">
            <div className="doctor--card-body">
                <div className="doctor--card-header">
                    <img
                        alt={`${doctor.name} Image`}
                        className="doctor--card-img"
                        src={`data:image/jpg;base64,${doctor.image}`}
                    />
                    <div className="doctor--card-info">
                        <button className="doctor--card-name">{doctor.name}</button>
                        <div className="doctor--card-specialization">
                            {doctor.specialization}
                        </div>
                    </div>
                </div>
                <div className="doctor--card-details">
                    <div className="doctor--card-hospital">
                        <strong>Hospital:</strong> {doctor.hospital}
                    </div>
                </div>
                <div className="doctor--card-footer">
                    <span className="doctor--card-availability">
                        Available on {doctor.availabilityDate}
                    </span>
                </div>
            </div>
        </div>
    );
};

// SidebarFilter component definition
const SidebarFilter = ({ locations, specializations, organizations, onFilterChange, filters }) => {
    return (
        <div className="sidebar-filter">
            <h2 className="filter--title">Doctor Search</h2>
            <FilterDropdown
                title="Location/City"
                options={locations}
                selectedOption={filters.location}
                setSelectedOption={(value) => onFilterChange('location', value)}
            />
            <FilterDropdown
                title="Hospitals & Clinics"
                options={organizations}
                selectedOption={filters.organization}
                setSelectedOption={(value) => onFilterChange('organization', value)}
            />
            <FilterDropdown
                title="Speciality"
                options={specializations}
                selectedOption={filters.specialization}
                setSelectedOption={(value) => onFilterChange('specialization', value)}
            />
            <FilterDropdown
                title="Doctor's Gender"
                options={['Male', 'Female', 'Other']}
                selectedOption={filters.gender}
                setSelectedOption={(value) => onFilterChange('gender', value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => onFilterChange('clear')}
            >
                Clear Filter
            </Button>
        </div>
    );
};

// DoctorDoctorSearch component definition
const DoctorDoctorSearch = () => {
    const { doctorsList, filteredDoctors, specializations, organizations, locations, setFilteredDoctors, selectedDoctor, setSelectedDoctor } = useContext(DoctorContext);

    const [filters, setFilters] = useState({
        location: '',
        specialization: '',
        organization: '',
        gender: ''
    });

    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    const sethandle = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const applyFilters = () => {
        let filtered = doctorsList;

        if (filters.location) {
            filtered = filtered.filter(doctor => doctor.location === filters.location);
        }
        if (filters.specialization) {
            filtered = filtered.filter(doctor => doctor.specialization === filters.specialization);
        }
        if (filters.organization) {
            filtered = filtered.filter(doctor => doctor.hospital === filters.organization);
        }
        if (filters.gender) {
            filtered = filtered.filter(doctor => doctor.gender === filters.gender);
        }

        setFilteredDoctors(filtered);
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'clear') {
            setFilters({
                location: '',
                specialization: '',
                organization: '',
                gender: ''
            });
            setFilteredDoctors(doctorsList);
        } else {
            setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
        }
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedDoctors = filteredDoctors.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex'}}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <SidebarFilter
                        locations={locations}
                        specializations={specializations}
                        organizations={organizations}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box mb={2}>
                        <span className="font--family fs--18 font--normal color--grey">
                            {filteredDoctors.length} results found, from your search &nbsp;
                            <strong>
                                <span className="font--bold fs--20 font--capitalize">
                                    {filters.specialization ? `"${filters.specialization}" , ` : ''} 
                                    {filters.location ? `"${filters.location}" , ` : ''} 
                                    {filters.organization ? `"${filters.organization} , "` : ''} 
                                    {filters.gender ? `"${filters.gender}"` : ''} 
                                </span>
                            </strong>
                        </span>
                    </Box>
                    <div className="doctor--card-container">
                        {paginatedDoctors.length > 0 ? paginatedDoctors.map((doctor, index) => (
                            <DoctorCard key={index} doctor={doctor} sethandle={sethandle} />
                        )) : "No results found."}
                    </div>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Pagination
                            count={Math.ceil(filteredDoctors.length / itemsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DoctorDoctorSearch;
