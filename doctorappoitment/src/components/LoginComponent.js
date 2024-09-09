import axios from 'axios';
import React, { useState } from 'react'
import "./logincomponent.css"
import { useNavigate } from 'react-router-dom';


const dataUrl = 'https://localhost:7146/api/Login'; // Replace with your local server URL


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient'); // Default role is Admin
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
const navigate = useNavigate()
  const validateForm = () => {
      let valid = true;
      let errorMsg = '';

      if (!username) {
          errorMsg = 'Username is required.';
          valid = false;
      } else if (!password) {
          errorMsg = 'Password is required.';
          valid = false;
      }

      setError(errorMsg);
      return valid;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      try {
          const response = await axios.post(dataUrl, {
              email: username,
              password: password,
              role: role
          });

          if (response.status === 200) {
              // console.log('Login Successful:', { username, password, role });
              setSuccess('Login successful!');
              setError('');
              if (role=="Admin")
              {
                navigate("/admin")
              }
              else if(role == "Doctor")
              {
                navigate("")

              }
              else if(role == "Patient")
              {
              //  console.log(response)
          sessionStorage.setItem("Patient",response.data.id)
                navigate("/patient-dash")

              }
              // Redirect or handle successful login here
          } else {
              setError('Invalid username, password, or role.');
              setSuccess('');
          }
      } catch (err) {
          console.error('Error logging in:', err);
          setError('An error occurred while logging in. Please try again.');
          setSuccess('');
          

      }



  };

  const handleRegister = () => {
      // Handle registration redirection or logic here
      // console.log('Redirecting to register page...');
      // Example: history.push('/register'); or window.location.href = '/register';

    if(role == "Doctor")
        {
          navigate("/doctor-register")

        }
        else if(role == "Patient")
        {
          
          navigate("/patient-register")

        }





  };

  // Dynamic background images based on role
  const getBackgroundImage = () => {
      switch (role) {
          case 'Admin':
              return process.env.PUBLIC_URL + '/images/Admin.jpg'; // Use correct image paths
          case 'Doctor':
              return process.env.PUBLIC_URL + '/images/Hands.jpg';
          case 'Patient':
              return process.env.PUBLIC_URL + '/images/patientpic.jpg';
          default:
              return "";
      }
  };

  return (
      <div className="background" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
          <div className="card-container">
              <div className="card-body">
                  <h2 className="card-title">Login</h2>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <input
                              type="text"
                              id="username"
                              className="form-control"
                              placeholder="Enter username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                          />
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
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="role">User Role</label>
                          <select
                              id="role"
                              className="form-control"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                          >
                              <option value="Admin">Admin</option>
                              <option value="Doctor">Doctor</option>
                              <option value="Patient">Patient</option>
                          </select>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">
                          Login
                      </button>
                      <button type="button" className="btn btn-register btn-block" onClick={handleRegister}>
                          Register
                      </button>
                      {error && <div className="error-message">{error}</div>}
                      {success && <div className="success-message">{success}</div>}
                  </form>
              </div>
          </div>
      </div>
  );
  
}

export default LoginComponent