import React from 'react';

import Grid from '@mui/material/Grid';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import logo from '../../assets/images/loginLogo.png';
import useLogin from './hooks/useLogin';
import Loader from '../../components/Loader';
import LoginAlert from '../../components/LoginAlert';


function Login() {

    const {
        redirect,
        loading,
        verifyMsg,
        closeDialog,
        isGuestModeOn,
        localAppData,
        loginAsGuest

    } = useLogin();

    return (
        <>
            <Loader open={loading} />
            <Grid container justifyContent="center" alignItems="center" className="loginContainer">

                <Grid item xs={12} sm={10} md={8} lg={6} className="loginLef loginCard">
                    { !isGuestModeOn && <Box
                        className="logingBox"
                    >
                        <img src={logo} className="loginImage" />

                        <Typography sx={{textAlign:"center"}}>{loading ? "Verifying your credentials..." : verifyMsg}
                        </Typography>
                    </Box>}
                </Grid>

                <LoginAlert
                    open={isGuestModeOn}
                    handleClose={closeDialog}
                    title="Welcome to your AI chat companion. Let's explore new ideas together!"
                    message="Get the best of our AI assistant by logging in! Access saved chats, tailored responses, and more."
                    localAppData={localAppData}
                    login={redirect}
                    loginAsGuest={loginAsGuest}
                    showGuestBtn={true}
                    showDisclaimer={true}

                />
            </Grid>
        </>
    );
}

export default Login;
