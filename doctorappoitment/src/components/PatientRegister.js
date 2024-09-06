import React, { useState } from 'react'
import "./patientregister.css"
import axios from 'axios';

const apiUrl = 'https://localhost:7146/api/Patient'; 


const PatientRegister = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null); // For image upload
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
      if (file && fileTypes.includes(file.type)) {
        setPhoto(file);
        setError(''); // Clear error if valid
      } else {
        setPhoto(null);
        setError('Please upload a valid image (jpg, jpeg, png, gif).');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Basic validation
      if (!name || !mobile || !email || !address || !gender || !password || !photo) {
        setError('All fields are required, including a valid image.');
        return;
      }
  
      // Password validation: at least 1 capital, 1 lowercase, 1 special character, 1 number, and more than 8 characters
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must be at least 8 characters long, contain 1 capital letter, 1 lowercase letter, 1 number, and 1 special character.');
        return;
      }
      setError('');
      // Creating form data to handle image upload
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
          setError('');
          // Reset form
          setName('');
          setMobile('');
          setEmail('');
          setAddress('');
          setGender('');
          setPassword('');
          setPhoto(null);
        }
      } catch (err) {
        console.error('Error registering patient:', err);
        setError('Registration failed. Please try again.');
        setSuccess('');
      }
    };
  
    return (
      <div className="background">
        <div className="card card-container">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Patient Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <div id="gender" className="form-check">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    className="form-check-input"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male" className="form-check-label">Male</label>
                </div>
                <div id="gender" className="form-check">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    className="form-check-input"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female" className="form-check-label">Female</label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                  type="file"
                  id="photo"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Register
              </button>
              {error && <div className="text-danger text-center mt-2">{error}</div>}
              {success && <div className="text-success text-center mt-2">{success}</div>}
            </form>
          </div>
        </div>
      </div>
    );
}

export default PatientRegister