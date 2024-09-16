import React from 'react';
import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, CircularProgress, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character')
    .required('New password is required'),
  userType: Yup.string().oneOf(['Doctor', 'Patient'], 'Please select a valid user type').required('User type is required')
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
      userType: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      
      try {
        // Replace with your API call
        const response = await fetch('https://localhost:7146/api/Login/forgot-password', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          setStatus('success');
          navigate('/login');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
        console.error('Error resetting password:', err);
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
          Forgot Password
        </Typography>
        
        {formik.status && (
          <Alert severity={formik.status === 'success' ? 'success' : 'error'}>
            {formik.status === 'success' ? 'Password reset successful!' : 'Password reset failed!'}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
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
            label="New Password"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="normal" error={formik.touched.userType && Boolean(formik.errors.userType)}>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="userType"
              name="userType"
              value={formik.values.userType}
              label="User Type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Patient">Patient</MenuItem>
            </Select>
            {formik.touched.userType && formik.errors.userType && (
              <FormHelperText>{formik.errors.userType}</FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;
