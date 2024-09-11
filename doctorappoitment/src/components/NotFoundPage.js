import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css'; // Import the CSS file for styling

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src="https://www.bing.com/th/id/OGC.db8ed17d964e198129fa8203c06d7bd6?pid=1.7&rurl=http%3a%2f%2fwww.sitesbay.com%2ffiles%2f404.gif&ehk=rAjITNLVYuiunk3y9AKDyM9HmSQiIKcyleBDNgJzsyw%3d" // Path to your 404 image
          alt="404 Not Found"
          className="not-found-image"
        />
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-message">The page you are looking for does not exist.</p>
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

export default NotFoundPage;
