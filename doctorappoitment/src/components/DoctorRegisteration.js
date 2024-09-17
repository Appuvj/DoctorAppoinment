import React, { useState } from 'react';
import axios from 'axios';
import { PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Avatar, IconButton, CircularProgress, FormHelperText, Alert, InputAdornment, IconButton as MUIButton } from '@mui/material';

const todayDate = new Date().toISOString().split('T')[0];

const apiUrl = 'https://localhost:7146/api/Doctor'; // Update with your actual API URL

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(4, 'Name must be at least 4 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabets')
    .required('Name is required'),
  mobile: Yup.string()
    .trim()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  email: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be in the format')
    .email('Invalid email address')
    .required('Email is required'),
  specilization: Yup.string()
    .trim()
    .min(4, 'Specilization must be at least 4 characters')
    .matches(/^[A-Za-z\s]+$/, 'Specilization must contain only alphabets')
    .required('Specilization is required'),
  organization: Yup.string()
    .trim()
    .min(4, 'Organization must be at least 4 characters')
    .matches(/^[A-Za-z\s]+$/, 'Organization must contain only alphabets')
    .required('Organization is required'),
  location: Yup.string()
    .trim()
    .min(4, 'Location must be at least 4 characters')
    .required('Location is required'),
  availableDate: Yup.string()
    .required('Available Date is required'),
  gender: Yup.string()
    .required('Gender is required'),
  password: Yup.string()
    .trim()
    .matches(/^(?!.*\s).+$/, 'Password must not contain spaces') // Updated regex to disallow spaces
    .matches(/(?=.*[a-z])/, 'Must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
    .matches(/(?=.*\d)/, 'Must contain at least one number')
    .matches(/(?=.*[@$!%*?&])/, 'Must contain at least one special character')
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  photo: Yup.mixed()
    .required('Photo is required')
    .test('fileType', 'Only .jpg, .jpeg, and .png files are allowed', value => {
      return !value || ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
    })
});

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
      formData.append('Name', values.name.trim());
      formData.append('Contact', values.mobile.trim());
      formData.append('Specialization', values.specilization.trim());
      formData.append('Email', values.email.trim());
      formData.append('Organization', values.organization.trim());
      formData.append('Gender', values.gender);
      formData.append('Password', values.password.trim());
      formData.append('AvailableFrom', values.availableDate);
      formData.append('Location', values.location.trim());
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
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Specilization"
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
            label="Organization"
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
            label="Location"
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
              min: todayDate,
            }}
            value={formik.values.availableDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.availableDate && Boolean(formik.errors.availableDate)}
            helperText={formik.touched.availableDate && formik.errors.availableDate}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText error>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>
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
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
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
