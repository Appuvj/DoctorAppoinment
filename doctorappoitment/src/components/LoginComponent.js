import axios from 'axios';
import React, { useState } from 'react'
import "./logincomponent.css"


const dataUrl = 'https://localhost:7146/api/Login'; // Replace with your local server URL


const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Admin'); // Default role is Admin
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(dataUrl,{
            "email": username,
            "password": password,
            "role": role
          })
        const data = response.data;
  
        // Check if user exists with matching username, password, and role
        
  
        if (response.status === 200) {
          console.log('Login Successful:', { username, password, role });
          setError('');
          // Redirect or handle successful login
        } else {
          setError('Invalid username, password, or role');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
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
            <h2 className="card-title text-center">Login</h2>
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
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">User</label>
                <select
                  id="role"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Login
              </button>
              {error && <div className="text-danger text-center mt-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  
}

export default LoginComponent