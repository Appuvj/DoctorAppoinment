import React, { useState } from 'react';
import axios from 'axios';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Avatar, IconButton, CircularProgress, FormHelperText, Alert, Card, CardContent } from '@mui/material';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const todayDate = new Date().toISOString().split('T')[0];

const apiUrl = 'https://localhost:7146/api/Doctor'; // Update with your actual API URL

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
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
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      specification: '',
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
      formData.append('AvailableFrom',values.availableDate);
      formData.append('Location', values.location);
      formData.append('Image', values.photo);

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setStatus('success');
          navigate("/login");
        }
      } catch (err) {
        setStatus('error');
        console.error('Error registering doctor:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });
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
//     <Container sx={{ py: 5 }}>
//       <Card sx={{ maxWidth: 500, mx: 'auto', boxShadow: 3 }}>
//         <CardContent>
//           <Typography variant="h5" component="div" align="center" gutterBottom>
//             Doctor Registration
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
//               <Avatar
//                 sx={{ width: 100, height: 100, mb: 2 }}
//                 src={photo ? URL.createObjectURL(photo) : ''}
//               />
//               <IconButton
//                 color="primary"
//                 aria-label="upload picture"
//                 component="label"
//               >
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={handlePhotoChange}
//                 />
//                 <PhotoCamera />
//               </IconButton>
//               {errors.photo && <FormHelperText error>{errors.photo}</FormHelperText>}
//             </Box>
//             <TextField
//               fullWidth
//               margin="normal"
//               id="name"
//               label="Name"
//               variant="outlined"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 validateField('name', e.target.value);
//               }}
//               onBlur={() => validateField('name', name)}
//               error={!!errors.name}
//               helperText={errors.name}
//             />

//             <TextField
//               fullWidth
//               margin="normal"
//               id="mobile"
//               label="Mobile"
//               variant="outlined"
//               value={mobile}
//               onChange={(e) => {
//                 setMobile(e.target.value);
//                 validateField('mobile', e.target.value);
//               }}
//               onBlur={() => validateField('mobile', mobile)}
//               error={!!errors.mobile}
//               helperText={errors.mobile}
//             />

//             <TextField
//               fullWidth
//               margin="normal"
//               id="location"
//               label="Location"
//               variant="outlined"
//               value={location}
//               onChange={(e) => {
//                 setLocation(e.target.value);
//                 validateField('location', e.target.value);
//               }}
//               onBlur={() => validateField('location', location)}
//               error={!!errors.location}
//               helperText={errors.location}
//             />
            
//             <TextField
//               fullWidth
//               margin="normal"
//               id="specification"
//               label="Specialization"
//               variant="outlined"
//               value={specification}
//               onChange={(e) => {
//                 setSpecification(e.target.value);
//                 validateField('specification', e.target.value);
//               }}
//               onBlur={() => validateField('specification', specification)}
//               error={!!errors.specification}
//               helperText={errors.specification}
//             />

//             <TextField
//               fullWidth
//               margin="normal"
//               id="email"
//               label="Email"
//               type="email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 validateField('email', e.target.value);
//               }}
//               onBlur={() => validateField('email', email)}
//               error={!!errors.email}
//               helperText={errors.email}
//             />

//             <TextField
//               fullWidth
//               margin="normal"
//               id="organization"
//               label="Organization"
//               variant="outlined"
//               value={organization}
//               onChange={(e) => {
//                 setOrganization(e.target.value);
//                 validateField('organization', e.target.value);
//               }}
//               onBlur={() => validateField('organization', organization)}
//               error={!!errors.organization}
//               helperText={errors.organization}
//             />

//             <FormControl fullWidth margin="normal" error={!!errors.gender}>
//             <InputLabel id="gender-label">Gender</InputLabel>
//               <Select
//                 labelId="gender-label"
//                 id="gender"
//                 value={gender}
//                 label="Gender"
//                 onChange={(e) => {
//                   setGender(e.target.value);
//                   validateField('gender', e.target.value);
//                 }}
//                 onBlur={() => validateField('gender', gender)}
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </Select>
//               {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
//             </FormControl>

//             <TextField
//               fullWidth
//               margin="normal"
//               id="password"
//               label="Password"
//               type="password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 validateField('password', e.target.value);
//               }}
//               onBlur={() => validateField('password', password)}
//               error={!!errors.password}
//               helperText={errors.password}
//             />

// <TextField
//       fullWidth
//       margin="normal"
//       id="availableDate"
//       label="Available Start Date"
//       type="date"
//       InputLabelProps={{ shrink: true }}
//       variant="outlined"
//       value={availableDate}
//       onChange={(e) => {
//         setAvailableDate(e.target.value);
//         validateField('availableDate', e.target.value);
//       }}
//       onBlur={() => validateField('availableDate', availableDate)}
//       error={!!errors.availableDate}
//       helperText={errors.availableDate}
//       inputProps={{
//         min: getTodayDate(), // Set min date to today
//       }}
//     />

//             <Box sx={{ mt: 3, textAlign: 'center' }}>
//               {success && <Typography color="success.main">{success}</Typography>}
//               {errors.global && <Typography color="error">{errors.global}</Typography>}
//               <Button type="submit" variant="contained" color="primary">
//                 Register
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>























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
            {formik.status === 'success' ? 'Registration successful!' : 'Registration failed!'}
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
            onChange={formik.handleChange}
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
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DoctorRegistration;
