import React from 'react';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const SuccessMsg = ({ handleReset }) => {
    return (
        <div className="success-msg-box">
            <div className="success-icon-circle">
                <DoneIcon className="done-icon check-animation" />
            </div>
            <p className="success-msg-text">All steps successfully completed!</p>
            <Button 
                variant="contained" 
                className="home-button"
                onClick={handleReset}
            >
                Home
            </Button>
        </div>
    );
}

export default SuccessMsg;
