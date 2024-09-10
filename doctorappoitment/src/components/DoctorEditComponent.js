import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, CardContent, Typography, TextField, MenuItem, Button, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DoctorContext } from './DoctorDashContext';

function base64ToImageFile(base64String, fileName) {
    // Decode base64 string
    try {
        const mimeType = base64String.match(/data:(.*?);base64,/)[1];
        const byteString = atob(base64String.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ia], { type: mimeType });
        return new File([blob], fileName, { type: mimeType });
    } catch (error) {
        console.error("Error converting base64 to image:", error);
        return null;
    }
}

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const apiUrl = 'https://localhost:7146/api/Doctor/'; // Update with your actual API URL
  const extractDate = (dateTimeString) => {
    return dateTimeString.split('T')[0]; // Extracts "2024-09-10"
  };

  
const DoctorEditComponent = () => {

    const {doctors,id, doctorsList,filteredDoctors,specializations,organizations,locations,setFilteredDoctors,selectedDoctor,setSelectedDoctor, fetchDatas ,fetchDoctors} = useContext(DoctorContext)
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [specification, setSpecification] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [availableDate, setAvailableDate] = useState('');
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [location, setLocation] = useState('');
  
    const today = new Date().toISOString().split('T')[0];
  
    useEffect(()=>{
        console.log(doctors)
        if(doctors)
        {
            setName(doctors.name)
            setMobile(doctors.contact)
            setEmail(doctors.email)
            setLocation(doctors.location)
            setGender(doctors.gender)
            setPassword(doctors.password)
            setSpecification(doctors.specialization)
            setOrganization(doctors.organization)
            setAvailableDate(extractDate(doctors.availableFrom))
            if (doctors.imageData) {
                const base64String = `data:image/jpg;base64,${doctors.imageData}`;
                const imageFile = base64ToImageFile(base64String, 'image.jpg');
                setPhoto(imageFile);  // Set the file
            }
        }
      },[id,doctors,fetchDatas])
    const validateField = (fieldName, value) => {
      let error = '';
      switch (fieldName) {
        case 'name':
          error = value ? '' : 'Name is required.';
          break;
        case 'mobile':
          error = /^[0-9]{10}$/.test(value) ? '' : 'Mobile number must be 10 digits.';
          break;
        case 'specification':
          error = value ? '' : 'Specialization is required.';
          break;
        case 'email':
          error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address.';
          break;
        case 'organization':
          error = value ? '' : 'Organization is required.';
          break;
        case 'gender':
          error = value ? '' : 'Gender is required.';
          break;
        case 'location' :
          error = value ? '' : 'location is required';
          break;
        case 'password':
          error = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
            ? '' : 'Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
          break;
        case 'availableDate':
          error = value && value >= today ? '' : 'Valid available date is required.';
          break;
        case 'photo':
          error = value ? '' : 'Photo is required.';
          break;
        default:
          break;
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: error
      }));
    };
  
    const validateForm = () => {
      const validations = {
        name: validateField('name', name),
        mobile: validateField('mobile', mobile),
        specification: validateField('specification', specification),
        email: validateField('email', email),
        organization: validateField('organization', organization),
        gender: validateField('gender', gender),
        password: validateField('password', password),
        availableDate: validateField('availableDate', availableDate),
        photo: validateField('photo', photo),
        location: validateField('location', location),
  
      };
      setErrors(validations);
      return Object.values(validations).every(error => error === '');
    };
  
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setPhoto(file);
        validateField('photo', file);
        
      } else {
        setPhoto(null);
        validateField('photo', '');
      }
    };
  
    const handleSubmit = async (e) => {
     
      e.preventDefault();
  
      // Validate all fields
      // if (!validateForm()) {
      //   return;
      // }
  
      console.log("hii")
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Contact', mobile);
      formData.append('Specialization', specification);
      formData.append('Email', email);
      formData.append('Organization', organization);
      formData.append('Gender', gender);
      formData.append('Password', password);
      formData.append('AvailableFrom', availableDate);
      formData.append('Location', location);
  
      if (photo) formData.append('Image', photo);
  
      try {
        const response = await axios.put(apiUrl+id, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (response.status === 200) {
          setSuccess('Registration successful!');
          setErrors({});
          // Reset form
          setName('');
          setMobile('');
          setSpecification('');
          setEmail('');
          setOrganization('');
          setGender('');
          setPassword('');
          setAvailableDate('');
          setLocation('');
          setPhoto(null);
          navigate("/login")
        }
      } catch (err) {
        console.error('Error registering doctor:', err);
        setErrors({ global: 'Registration failed. Please try again.' });
        setSuccess('');
      }
    };
  
    return (
      <Container sx={{ py: 5 }}>
        <Card sx={{ maxWidth: 500, mx: 'auto', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center" gutterBottom>
              Doctor Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateField('name', e.target.value);
                }}
                onBlur={() => validateField('name', name)}
                error={!!errors.name}
                helperText={errors.name}
              />
  
              <TextField
                fullWidth
                margin="normal"
                id="mobile"
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  validateField('mobile', e.target.value);
                }}
                onBlur={() => validateField('mobile', mobile)}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
       <TextField
                fullWidth
                margin="normal"
                id="location"
                label="location"
                type="text"
                variant="outlined"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  validateField('location', e.target.value);
                }}
                onBlur={() => validateField('location', location)}
                error={!!errors.location}
                helperText={errors.location}
              />
              <TextField
                fullWidth
                margin="normal"
                id="specification"
                label="Specialization"
                variant="outlined"
                value={specification}
                onChange={(e) => {
                  setSpecification(e.target.value);
                  validateField('specification', e.target.value);
                }}
                onBlur={() => validateField('specification', specification)}
                error={!!errors.specification}
                helperText={errors.specification}
              />
  
              <TextField
                fullWidth
                margin="normal"
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField('email', e.target.value);
                }}
                onBlur={() => validateField('email', email)}
                error={!!errors.email}
                helperText={errors.email}
              />
  
              <TextField
                fullWidth
                margin="normal"
                id="organization"
                label="Organization"
                variant="outlined"
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                  validateField('organization', e.target.value);
                }}
                onBlur={() => validateField('organization', organization)}
                error={!!errors.organization}
                helperText={errors.organization}
              />
  
              <FormControl fullWidth margin="normal" error={!!errors.gender}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    validateField('gender', e.target.value);
                  }}
                  onBlur={() => validateField('gender', gender)}
                >
                  <MenuItem value="" disabled>Select gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                <FormHelperText>{errors.gender}</FormHelperText>
              </FormControl>
  
              <TextField
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField('password', e.target.value);
                }}
                onBlur={() => validateField('password', password)}
                error={!!errors.password}
                helperText={errors.password}
              />
  
  <TextField
        fullWidth
        margin="normal"
        id="availableDate"
        label="Available Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        value={availableDate}
        onChange={(e) => {
          setAvailableDate(e.target.value);
          validateField('availableDate', e.target.value);
        }}
        onBlur={() => validateField('availableDate', availableDate)}
        error={!!errors.availableDate}
        helperText={errors.availableDate}
        inputProps={{
          min: getTodayDate(), // Set min date to today
        }}
      />
  
              <Button
                fullWidth
                variant="contained"
                component="label"
                sx={{ mt: 3 }}
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .png"
                  onChange={handlePhotoChange}
                />
              </Button>

              {photo && typeof photo === 'object' && (
    <div style={{ marginTop: '10px' }}>
        Previous choosen : 
      <img 
        src={URL.createObjectURL(photo)} 
        alt="Image Preview" 
        width="100" 
      />
    </div>
  )}
              {errors.photo && <FormHelperText error>{errors.photo}</FormHelperText>}
  
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3 }}
              >
                Update
              </Button>
  
              {errors.global && <Typography color="error" align="center" sx={{ mt: 2 }}>{errors.global}</Typography>}
              {success && <Typography color="success" align="center" sx={{ mt: 2 }}>{success}</Typography>}
            </form>
          </CardContent>
        </Card>
      </Container>
    );
}

export default DoctorEditComponent