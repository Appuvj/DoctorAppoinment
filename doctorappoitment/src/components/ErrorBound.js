import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ErrorBound.css'; // Import the CSS file for styling

const ErrorBound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src="https://cdn.dribbble.com/users/1120320/screenshots/3898259/error.gif"
          alt="Error"
          className="not-found-image"
        />
        <h1 className="not-found-title">Something Went Wrong</h1>
        
        <Button
          variant="contained"
          color="primary"
          className="not-found-button"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
      </div>
      
    </div>
  );
};

export default ErrorBound;
