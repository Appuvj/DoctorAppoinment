import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, MenuItem, Button, FormControl, InputLabel, Select, FormHelperText, Box, Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const todayDate = new Date().toISOString().split('T')[0];

const apiUrl = 'https://localhost:7146/api/Doctor'; // Update with your actual API URL

const DoctorRegistration = () => {
  const navigate = useNavigate();
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

  const today = getTodayDate();

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
      case 'location':
        error = value ? '' : 'Location is required.';
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

    // if (!validateForm()) {
    //   return;
    // }

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
      const response = await axios.post(apiUrl, formData, {
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
        navigate("/login");
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, mb: 2 }}
                src={photo ? URL.createObjectURL(photo) : ''}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
                <PhotoCamera />
              </IconButton>
              {errors.photo && <FormHelperText error>{errors.photo}</FormHelperText>}
            </Box>
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
              label="Location"
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
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                  validateField('gender', e.target.value);
                }}
                onBlur={() => validateField('gender', gender)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
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

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              {success && <Typography color="success.main">{success}</Typography>}
              {errors.global && <Typography color="error">{errors.global}</Typography>}
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DoctorRegistration;
