import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://localhost:7146/api/Patient';

// Custom styles for Card
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
}));

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    transition: 'none', // Remove transition effect
  },
  '& .Mui-focused': {
    transition: 'none', // Remove transition effect
  },
});

const CustomRadioGroup = styled(RadioGroup)({
  '& .MuiFormControlLabel-root': {
    transition: 'none', // Remove transition effect
  },
});

const PatientRegister = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
const navigate = useNavigate()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && fileTypes.includes(file.type)) {
      setPhoto(file);
      setError('');
    } else {
      setPhoto(null);
      setError('Please upload a valid image (jpg, jpeg, png).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !email || !address || !gender || !password || !photo) {
      setError('All fields are required, including a valid image.');
      setOpenSnackbar(true);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, contain 1 capital letter, 1 lowercase letter, 1 number, and 1 special character.');
      setOpenSnackbar(true);
      return;
    }
    
    setError('');
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Contact', mobile);
    formData.append('Email', email);
    formData.append('Address', address);
    formData.append('Gender', gender);
    formData.append('Password', password);
    formData.append('Image', photo);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Registration successful!');
        setOpenSnackbar(true);
        setName('');
        setMobile('');
        setEmail('');
        setAddress('');
        setGender('');
        setPassword('');
        setPhoto(null);
       
        navigate("/login")

      }
    } catch (err) {
      console.error('Error registering patient:', err);
      setError('Registration failed. Please try again.');
      setOpenSnackbar(true);
      setSuccess('');
    }
  };

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Patient Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <CustomTextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <CustomTextField
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <CustomTextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CustomTextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <FormControl component="fieldset" margin="normal" fullWidth required>
              <InputLabel>Gender</InputLabel>
              <CustomRadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                aria-labelledby="gender-radio-buttons"
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </CustomRadioGroup>
            </FormControl>
            <CustomTextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="photo">Photo</InputLabel>
              <Input
                type="file"
                id="photo"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                required
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
          {success && (
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
              <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                {success}
              </Alert>
            </Snackbar>
          )}
          {error && (
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
              <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default PatientRegister;
