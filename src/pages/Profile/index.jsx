import React, { useState } from 'react';
import profile from '../../assets/images/profileBg.png';
import profilePhoto from '../../assets/images/profile-photo.png';
import { Grid, Typography, Button, Avatar } from '@mui/material';
import ViewProfile from './component/ViewProfile';
import EditProfile from './component/EditProfile';

function Profile() {
    const [viewProfile, setviewProfile] = useState(true);
    
    return (
        <>
            <Grid container className="profileContainer">
                <Grid item xs={12}>
                    <img src={profile} alt="About Us" className="profileBgImg" />
                </Grid>
                <Grid item xs={12} md={3} className="profileSection">
                    <Avatar
                        alt="Profile Photo"
                        src={profilePhoto}
                        className="profileImg"
                    />
                    <Typography variant="h5" className="userName">Your Name</Typography>
                    <Typography variant="body1" className="userName">Designation</Typography>
                </Grid>
           
                <Grid item xs={12} md={9} className="profileActions">
                    <Button
                        variant={viewProfile ? "contained" : "outlined"}
                        className={viewProfile ? "addProfileBtn" : "changeProfileBtn"}
                        onClick={() => setviewProfile(true)}
                    >
                        My Profile
                    </Button>
                    <Button
                        variant={!viewProfile ? "contained" : "outlined"}
                        className={viewProfile ? "changeProfileBtn" : "addProfileBtn"}
                        onClick={() => setviewProfile(false)}
                    >
                        Edit Profile
                    </Button>
                </Grid>
                <Grid container className="profileDetailsContainer">
                <Grid item xs={12} md={12} className="profileDetails">
                    {viewProfile ? (
                        <ViewProfile readonly={true} />
                    ) : (
                        <EditProfile readonly={false} />
                    )}
                </Grid>
                </Grid>
          
                </Grid>
        </>
    );
}

export default Profile;
