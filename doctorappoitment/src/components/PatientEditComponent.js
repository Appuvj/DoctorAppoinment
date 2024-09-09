import React, { useContext, useEffect, useState } from 'react';
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
import { PatientContext } from './PatientDashContext';

const apiUrl = 'https://localhost:7146/api/Patient/';


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
const PatientEditComponent = () => {

    const {id,patients,fetchDatas} = useContext(PatientContext)
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

  useEffect(()=>{
    console.log(patients)
    if(patients)
    {
        setName(patients.name)
        setMobile(patients.contact)
        setEmail(patients.email)
        setAddress(patients.address)
        setGender(patients.gender)
        setPassword(patients.password)
        if (patients.image) {
            const base64String = `data:image/jpg;base64,${patients.image}`;
            const imageFile = base64ToImageFile(base64String, 'image.jpg');
            setPhoto(imageFile);  // Set the file
        }
    }
  },[id,patients,fetchDatas])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !email || !address || !gender || !password ) {
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
      const response = await axios.put(apiUrl+id, formData, {
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
              
              aria-readonly
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
            <FormControl fullWidth margin="normal" >
              <InputLabel htmlFor="photo">Photo</InputLabel>
              <Input
                type="file"
                id="photo"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                
              />
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
}

export default PatientEditComponent