import axios from 'axios';
import React, { useState } from 'react'
import "./doctorregister.css"
const apiUrl = 'https://localhost:7146/api/Doctor'; // Update with your actual API URL


const DoctorRegisteration = () => {
    const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [specification, setSpecification] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const today = new Date().toISOString().split('T')[0];
const [photoOk,setphotoOk] = useState(false)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setPhoto(file);
      setphotoOk(true)
    } else {
      setError('Invalid file type. Only .jpeg, .jpg, and .png formats are allowed.');
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log('Form submitted'); // Debugging log
    if(! photoOk)
    {
        setError('All fields are required.')
        return;
    }
    // Basic validation
    if (!name || !mobile || !specification || !email || !organization || !gender || !password || !availableDate) {
      setError('All fields are required.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Contact', mobile);
    formData.append('Specialization', specification);
    formData.append('Email', email);
    formData.append('Organization', organization);
    formData.append('Gender', gender);
    formData.append('Password', password);
    formData.append('AvailableFrom', availableDate);
    if (photo) formData.append('Image', photo);

    try {
      // Post data to the backend
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
        setSpecification('');
        setEmail('');
        setOrganization('');
        setGender('');
        setPassword('');
        setAvailableDate('');
        setPhoto(null);
      }
    } catch (err) {
      console.error('Error registering doctor:', err);
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="background">
      <div className="card card-container">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Doctor Registration</h2>
          <form onSubmit={handleSubmit}>
            {/* Name field */}
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
            
            {/* Mobile field */}
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

            {/* Specification field */}
            <div className="form-group">
              <label htmlFor="specification">Specilization</label>
              <input
                type="text"
                id="specification"
                className="form-control"
                placeholder="Enter specification"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                required
              />
            </div>

            {/* Email field */}
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

            {/* Organization field */}
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                className="form-control"
                placeholder="Enter organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>

            {/* Gender field */}
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

            {/* Password field */}
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

            {/* Availability Date field */}
            <div className="form-group">
              <label htmlFor="availableDate">Available Start Date</label>
              <input
                type="date"
                id="availableDate"
                className="form-control"
                value={availableDate}
                min={today}
                onChange={(e) => setAvailableDate(e.target.value)}
                required
              />
            </div>

            {/* Photo Upload */}
            <div className="form-group">
              <label htmlFor="photo">Upload Photo</label>
              <input
                type="file"
                id="photo"
                className="form-control"
                accept=".jpg, .jpeg, .png"
                onChange={handlePhotoChange}
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>

            {/* Error and Success messages */}
            {error && <div className="text-danger text-center mt-2">{error}</div>}
            {success && <div className="text-success text-center mt-2">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorRegisteration