import React, { useContext, useEffect, useState } from 'react'
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Avatar, IconButton, CircularProgress, FormHelperText, Alert, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DoctorContext } from './DoctorDashContext';
import DbService from '../Api/DbService';
import { PhotoCamera } from '@mui/icons-material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const todayDate = new Date().toISOString().split('T')[0];


const validationSchema = Yup.object({
  name: Yup.string().min(4, 'Name must be at least 4 characters').matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabets').required('Name is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  specilization: Yup.string().required('specilization is required'),
  organization: Yup.string().required('organization is required'),
  location: Yup.string().required('location is required'),

  availableDate: Yup.string().required('availableDate is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  photo: Yup.mixed().required('Photo is required').test('fileType', 'Only .jpg, .jpeg, and .png files are allowed', value => {
    return !value || ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
  })
});
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
  
  const apiUrl = 'Doctor/'; // Update with your actual API URL
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
    const currentTime = new Date().toLocaleTimeString('it-IT');
    const today = new Date().toISOString().split('T')[0];
    const formik = useFormik({
      initialValues: {
        name: '',
        mobile: '',
        email: '',
        specilization: '',
        organization: '',
        location: '',
        availableDate: '',
        gender: '',
        password: '',
        photo: null,
      },
      validationSchema,
      onSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
        setSubmitting(true);
  
        const formData = new FormData();
        formData.append('Name', values.name);
        formData.append('Contact', values.mobile);
        formData.append('Specialization', values.specilization);
        formData.append('Email', values.email);
        formData.append('Organization',values.organization);
        formData.append('Gender', values.gender);
        formData.append('Password',values.password);
        formData.append('AvailableFrom',values.availableDate+ "T" + currentTime);
        formData.append('Location', values.location);
        formData.append('Image', values.photo);
  
        try {
          const response = await DbService.put(apiUrl+id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },sessionStorage.getItem("token"));
  
          if (response.status === 200) {
            setStatus('success');

            await fetchDatas()
            toast.success('Update completed successfully!', {
              position: "bottom-right",
              autoClose: 3000, // Auto close after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
  
            await fetchDoctors()

            setTimeout(() => {
              navigate("/doctor-dash/doctor-search")
            }, 2000);
          }
        } catch (err) {
          setStatus('error');
          
        toast.error('Update failed, please try again.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });

          console.error('Error updating doctor:', err);
        } finally {
          setSubmitting(false);
        }
      },
    });



    useEffect(()=>{
        console.log(doctors)
        if(doctors)
        {



          formik.setFieldValue('name',doctors.name)
          formik.setFieldValue('mobile',doctors.contact)
          formik.setFieldValue('email',doctors.email)
          formik.setFieldValue('gender',doctors.gender)
          formik.setFieldValue('password',doctors.password)
          formik.setFieldValue('location',doctors.location)
          formik.setFieldValue('specilization',doctors.specialization)
          formik.setFieldValue('organization',doctors.organization)
          formik.setFieldValue('availableDate',extractDate(doctors.availableFrom))
          const base64String = `data:image/jpeg;base64,${doctors.imageData}` ; // Assuming your API returns a base64 string
     
          const file = base64ToImageFile(base64String, 'photo.jpg');
        
          formik.setFieldValue('photo', file);
          



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
        const response = await DbService.put(apiUrl+id, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        },sessionStorage.getItem("token"));
  
        if (response.status === 200) {
          setSuccess('Update successful!');
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


         

        }
      } catch (err) {
        console.error('Error updating doctor:', err);
        setErrors({ global: 'update failed. Please try again.' });
        setSuccess('');



      }
    };
  
    return (
      
      
      <Container maxWidth="sm">
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
          Doctor Registration
        </Typography>
        {formik.status && (
          <Alert severity={formik.status === 'success' ? 'success' : 'error'}>
            {formik.status === 'success' ? 'update successful!' : 'update failed!'}
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              src={formik.values.photo ? URL.createObjectURL(formik.values.photo) : ''}
            />
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  formik.setFieldValue('photo', file);
                  if (file) {
                    formik.setFieldError('photo', ''); // Clear the error if a file is selected
                  }
                }}
              />
              <PhotoCamera />
            </IconButton>
            {formik.errors.photo && formik.touched.photo && (
              <FormHelperText error>{formik.errors.photo}</FormHelperText>
            )}
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
            label="specilization"
            name="specilization"
            InputLabelProps={{
              shrink: true, // Ensure the label doesn't overlap with the date picker
            }}
            value={formik.values.specilization}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.specilization && Boolean(formik.errors.specilization)}
            helperText={formik.touched.specilization && formik.errors.specilization}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="organization"
            name="organization"
           
            value={formik.values.organization}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.organization && Boolean(formik.errors.organization)}
            helperText={formik.touched.organization && formik.errors.organization}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            sx={{ mb: 2 }}
          />
          <TextField
        fullWidth
        label="Available Date"
        type="date"
        name="availableDate"
        InputLabelProps={{
          shrink: true, // Ensure the label doesn't overlap with the date picker
        }}
        inputProps={{
          min: todayDate, // Restrict past dates
        }}
        value={formik.values.availableDate}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.availableDate && Boolean(formik.errors.availableDate)}
        helperText={formik.touched.availableDate && formik.errors.availableDate}
        sx={{ mb: 2 }}
      />
    


          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </Box>
      </Box>
      <ToastContainer />

    </Container>
    );
}

export default DoctorEditComponent