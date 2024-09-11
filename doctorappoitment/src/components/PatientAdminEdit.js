import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from './AdminDashContext';
import DbService from '../Api/DbService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhotoCamera } from '@mui/icons-material';
import { Container, Card, CardContent, Typography, TextField, MenuItem, Button, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

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

const apiUrl = 'Patient/'; // Update with your actual API URL
const extractDate = (dateTimeString) => {
  return dateTimeString.split('T')[0]; // Extracts "2024-09-10"
};

const PatientAdminEdit = () => {
  
  const { id } = useParams();
  const { fetchDatas } = useContext(AdminContext);
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');


  const today = new Date().toISOString().split('T')[0];

  const getPatient = async () =>{
    DbService.get(`Patient/${id}`, {}, sessionStorage.getItem("token")).then((res) => {
        
      setName(res.data.name)
      setMobile(res.data.contact)
       
       setEmail(res.data.email)
       setAddress(res.data.address)
       setGender(res.data.gender)
       setPassword(res.data.password)
      
         const base64String = `data:image/jpg;base64,${res.data.image}`;
         const imageFile = base64ToImageFile(base64String, 'image.jpg');
         setPhoto(imageFile);  // Set the file
     }).catch((err) => console.log(err));
  }

  const validateField = (fieldName, value) => {
    let error = '';
    switch (fieldName) {
      case 'name':
        error = value ? '' : 'Name is required.';
        break;
      case 'mobile':
        error = /^[0-9]{10}$/.test(value) ? '' : 'Mobile number must be 10 digits.';
        break;
      
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address.';
        break;
      case 'address':
        error = value ? '' : 'address is required.';
        break;
      case 'gender':
        error = value ? '' : 'Gender is required.';
        break;
 
      case 'password':
        error = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? '' : 'Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
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
    formData.append('Email', email);
    formData.append('Address', address);
    formData.append('Gender', gender);
    formData.append('Password', password);

    if (photo) formData.append('Image', photo);
console.log(formData)
    try {
      const response = await DbService.put(apiUrl+id, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      },sessionStorage.getItem("token"));

      if (response.status === 200) {
        setSuccess('update successful!');
        setErrors({});
        // Reset form

        await fetchDatas()
        setTimeout(()=>{
          navigate("/admin/dashboard/patients")
        },2000)

        
      
      }
    } catch (err) {
      console.error('Error updating patient:', err);
      setErrors({ global: 'updation failed. Please try again.' });
      setSuccess('');
    }
  };
  useEffect(() => {
   

    getPatient()
  }, []);

  return (

    <>
      <Container sx={{ py: 5 }}>
        <Card sx={{ maxWidth: 500, mx: 'auto', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center" gutterBottom>
              Patient 
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
                id="email"
                label="email"
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
                id="address"
                label="address"
                
                variant="outlined"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  validateField('address', e.target.value);
                }}
                onBlur={() => validateField('address', address)}
                error={!!errors.address}
                helperText={errors.address}
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



    {/* <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Patient Update
        </Typography>
        {formik.status && (
          <Alert severity={formik.status === 'success' ? 'success' : 'error'}>
            {formik.status === 'success' ? 'Update successful!' : 'Update failed!'}
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }} // Added margin-bottom for spacing
              src={formik.values.photo ? URL.createObjectURL(formik.values.photo) : `data:image/jpeg;base64,${patientData?.image}`}
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
                onChange={handleFileChange}
              />
              <PhotoCamera />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            type="tel"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="normal" error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Update '}
          </Button>
        </Box>
      </Box>
      {formik.status && (
        <Alert severity={formik.status === 'success' ? 'success' : 'error'}>
          {formik.status === 'success'
            ? 'Update successful!'
            : 'Update failed! Please try again.'}
        </Alert>
      )}
    </Container> */}
    </>
  );
}

export default PatientAdminEdit;
