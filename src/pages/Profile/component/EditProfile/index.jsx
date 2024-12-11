import React from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';

function EditProfile({ readonly }) {
    return (
        <>
            <Grid container spacing={2} className="formSection">
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Login ID</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="User123" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">E-Mail</Typography>
                    <TextField 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        defaultValue="user@example.com" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Full Name*</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="Your Name" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Mobile*</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="+1234567890" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Gender*</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="Male" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Date Of Birth*</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="2000-01-01" 
                        type="date" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Address*</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="1234 Main St, Apt 101" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Region/State*</Typography>
                    <TextField 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        defaultValue="California" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Zipcode/PIN Code*</Typography>
                    <TextField 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        defaultValue="90001" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Country*</Typography>
                    <TextField 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        defaultValue="United States" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Select Country</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="United States" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Organization Email</Typography>
                    <TextField 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        defaultValue="organization@example.com" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Last Login</Typography>
                    <TextField 
                        fullWidth
                        size="small" 
                        variant="outlined" 
                        defaultValue="2024-08-29 11:12:46" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">Last Updated</Typography>
                    <TextField 
                        fullWidth 
                        size="small"
                        variant="outlined" 
                        defaultValue="2024-08-29 11:12:46" 
                        InputProps={{ readOnly: readonly }} 
                    />
                </Grid>
            </Grid>

            {!readonly && (
                <Grid item xs={12} className="formButtons">
                    <Button variant="outlined" className="cancelBtn">Cancel</Button>
                    <Button variant="contained" className="updateBtn">Update</Button>
                </Grid>
            )}
        </>
    );
}

export default EditProfile;
