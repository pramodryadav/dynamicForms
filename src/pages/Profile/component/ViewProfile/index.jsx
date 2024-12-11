import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';

function ViewProfile({ readonly }) {
    return (
        <Grid container spacing={2} className="formSection">
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Login ID</Typography>
                <TextField fullWidth variant="outlined" value="User123" size="small" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">E-Mail</Typography>
                <TextField fullWidth variant="outlined" value="user@example.com" size="small" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Full Name*</Typography>
                <TextField fullWidth variant="outlined" value="Your Name" size="small" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Mobile*</Typography>
                <TextField fullWidth variant="outlined" value="+1234567890" size="small" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Gender*</Typography>
                <TextField fullWidth variant="outlined" value="Male" size="small" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Date Of Birth*</Typography>
                <TextField fullWidth variant="outlined" value="2000-01-01" size="small" type="date" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Address*</Typography>
                <TextField fullWidth variant="outlined" size="small" value="1234 Main St, Apt 101" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Region/State*</Typography>
                <TextField fullWidth variant="outlined" size="small" value="California" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Zipcode/PIN Code*</Typography>
                <TextField fullWidth variant="outlined" size="small" value="90001" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Country*</Typography>
                <TextField fullWidth variant="outlined" size="small" value="United States" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Select Country</Typography>
                <TextField fullWidth variant="outlined" size="small" value="United States" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Organization Email</Typography>
                <TextField fullWidth variant="outlined" size="small" value="organization@example.com" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Last Login</Typography>
                <TextField fullWidth variant="outlined" size="small" value="2024-08-29 11:12:46" InputProps={{ readOnly: readonly }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">Last Updated</Typography>
                <TextField fullWidth variant="outlined" size="small" value="2024-08-29 11:12:46" InputProps={{ readOnly: readonly }} />
            </Grid>
        </Grid>
    );
}

export default ViewProfile;
