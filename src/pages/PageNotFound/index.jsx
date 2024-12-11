import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const PageNotFound = () => {
    return (
        <Container className="page-not-found-container">
          
            <Typography variant="h4" className="page-not-found-message">
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" className="page-not-found-text">
                The page you are looking for does not exist or has been moved.
            </Typography>
            <Link to="/" className="page-not-found-button">
                Go to Homepage
            </Link>
        </Container>
    );
};

export default PageNotFound;
