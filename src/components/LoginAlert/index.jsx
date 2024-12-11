import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import brandLogo from "../../assets/images/loginLogo.png";
import Modal from "../Modal";



const LoginAlert = ({ open, title, message, handleClose, login, localAppData, loginAsGuest, showGuestBtn = true }) => {

    return (
        <Modal open={open} showCloseIcon={false} showTitle={false} handleClose={handleClose} maxWidth="xs">
            <Box className="welcome-container flex direction-column row-gap-10 padding-10">
                <div className="flex direction-column justifyC-center alignI-center">
                    <img src={brandLogo} className="appImage" />
                    <Typography className="app-label alignS-center">DocuFacts</Typography>
                </div>
                <div className="welcome-title" >
                    {title}
                </div>
                <div className="welcome-msg">
                    {message}
                </div>

                {showGuestBtn && <Button onClick={loginAsGuest} variant="outlined" fullWidth sx={{ textTransform: "none" }}>Continue as guest</Button>}
                <Button onClick={() => login(localAppData)} variant="contained" fullWidth sx={{ textTransform: "none" }}>Login</Button>
                <Typography variant="caption" className="text-center">  By using DocuFacts, you agree to our
                <a className="linkStyle" href={localAppData["termsURL"]} target="_blank"> Terms and Conditions </a>
                    and
                <a className="linkStyle" href={localAppData["privacyURL"]} target="_blank"> Privacy Policy</a>.</Typography>
            </Box>
        </Modal>
    )
}

export default LoginAlert
