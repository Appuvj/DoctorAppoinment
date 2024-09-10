import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Homepage
        </Button>
      </div>
    );
}

export default NotFoundPage