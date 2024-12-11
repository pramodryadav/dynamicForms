import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { AttachMoney, Timeline, PhoneIphone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-new.png';

const About = () => {
    const navigate = useNavigate();

    return (
        <Grid container className="aboutContainer">
            <div className="aboutUS">
                <Grid container className="aboutUSContainer">
                    <Grid item xs={12} md={9} className="headingBackIcon">
                        <KeyboardBackspaceIcon onClick={() => navigate("/")} className="abtBackIcon" />
                        <Typography variant="h1" className="Aboutheading">
                            <strong>About Smartinfologiks</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <img src={logo} alt="Company Logo" className="aboutLogo" />
                    </Grid>
                </Grid>
            </div>

            <Grid item xs={12}>
                <Grid container spacing={2} className="infoContainer">
                    <Grid item xs={12} md={4}>
                        <Card className="aboutCard">
                            <CardContent>
                                <AttachMoney className="aboutCardIcon" />
                                <Typography variant="h5" gutterBottom>
                                    Simplify Your Finances
                                </Typography>
                                <Typography variant="body1">
                                    Welcome to FintechPro, your ultimate tool for managing finances with ease. We designed our application to simplify budgeting, expense tracking, and financial planning to enhance your financial health.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className="aboutCard">
                            <CardContent>
                                <Timeline className="aboutCardIcon" />
                                <Typography variant="h5" gutterBottom>
                                    Streamline Your Budget
                                </Typography>
                                <Typography variant="body1">
                                    Our app helps you create and manage budgets effortlessly. Track your spending, set financial goals, and receive insights to make informed financial decisions.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className="aboutCard">
                            <CardContent>
                                <PhoneIphone className="aboutCardIcon" />
                                <Typography variant="h5" gutterBottom>
                                    Access Anytime, Anywhere
                                </Typography>
                                <Typography variant="body1">
                                    With our mobile-friendly design, you can manage your finances on the go. Access your financial data from any device, anytime, and stay on top of your financial goals.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default About;
