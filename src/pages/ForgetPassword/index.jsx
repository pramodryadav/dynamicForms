import React, { useState } from 'react';
import {
  Grid, TextField, Button, Typography, InputAdornment, Card, CardContent
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import logo from '../../assets/images/loginLogo.png';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = () => {
    setStep(2);
  };

  const handlePasswordSubmit = () => {
    // Add password update logic here
    setStep(3);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="loginContainer">
    <Grid item xs={12} sm={10} md={8} lg={6} className="loginLeft loginCard"> 
          <Grid item>

                <Grid item className="gridPadding">
                        <img src={logo} alt="Logo" className="loginLogo" />
                    </Grid>
                {step === 1 && (
                  <Grid container spacing={2} className="loginFormContainer">
                    <Grid item xs={12}>
                      <Typography variant="h5" className="loginTitle">
                        Forgot your password?
                      </Typography>
                      <Typography variant="subtitle1" className="loginSubtitle">
                        Please enter your email address to reset your password
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="loginTextField"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" fullWidth className="loginButton" onClick={handleEmailSubmit}>
                        Confirm
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" className="backToLoginLink">
                        <a href="/login">Back to login</a>
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {step === 2 && (
                  <Grid container spacing={2} className="loginFormContainer">
                    <Grid item xs={12}>
                      <Typography variant="h5" className="loginTitle">
                        Reset your password
                      </Typography>
                      <Typography variant="subtitle1" className="loginSubtitle">
                        Please enter your new password
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="loginTextField"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="loginTextField"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" fullWidth className="loginButton" onClick={handlePasswordSubmit}>
                        Confirm
                      </Button>
                    </Grid>
                  </Grid>
                )}

                {step === 3 && (
                  <Grid container spacing={2} className="successMessageContainer">
                    <Grid item xs={12}>
                      <Typography variant="h6" className="successMessageTitle">
                        Password updated successfully
                      </Typography>
                      <Typography variant="subtitle1" className="successMessageSubtitle">
                        You can now use your new password to log in.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth className="loginButton" onClick={handleEmailSubmit}>
                        Back to Login
                      </Button>
                    </Grid>
                  </Grid>
                )}
          </Grid>
        </Grid>
      </Grid>
  );
}

export default ForgotPassword;
