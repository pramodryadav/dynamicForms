import React from 'react';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import HomeIcon from '@mui/icons-material/Home';

const SuccessMsg = ({ handleReset }) => {
    return (
        <div className="success-msg-box">
            <div className="success-icon-circle">
                <DoneIcon className="done-icon check-animation" />
            </div>
            <p className="success-msg-text">All steps successfully completed!</p>
            <HomeIcon className="homeICon" onClick={handleReset}/>
          
        </div>
    );
}

export default SuccessMsg;
