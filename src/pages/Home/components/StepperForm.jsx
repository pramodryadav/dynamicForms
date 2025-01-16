import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography, Grid, TextField, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WestIcon from '@mui/icons-material/West';
import SuccessMsg from './SuccessMsg';
import useStepperForm from '../hooks/useStepperForm';
import Loader from '../../../components/Loader';

const StepperForm = ({ handleClickBack, subProjectDetail, selectedProject }) => {
    const {
        activeStep,
        subProjectName,
        stepForms,
        isSubProjectNameError,
        loading,
        handleChangeSubProjectName,
        handleBlurSubProjecName,
    } = useStepperForm(subProjectDetail, selectedProject);

    return (
        <>
            <Loader open={loading} />
            <Button startIcon={<WestIcon/>} variant='contained' onClick={handleClickBack}>Back</Button>
            <Box
                sx={{
                    padding: '20px',
                    maxWidth: '900px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                            Project Name:
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="subProjectName"
                            value={subProjectName}
                            onChange={handleChangeSubProjectName}
                            onBlur={handleBlurSubProjecName}
                            error={isSubProjectNameError}
                            helperText={isSubProjectNameError && 'Please enter a valid project name'}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontWeight: 'bold', marginBottom: '8px' }}>Status:</Typography>
                        <Typography
                            sx={{
                                padding: '8px 16px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                color: '#555',
                            }}
                        >
                            Draft
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: '30px' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {stepForms.map((stepForm, index) => (
                            <Step key={stepForm.label} completed={activeStep > index}>
                                <StepLabel
                                    StepIconProps={{
                                        icon: activeStep > index ? (
                                            <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        activeStep === index ? '#6242bd' : '#ccc',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: '#fff',
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {index + 1}
                                            </Box>
                                        ),
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: activeStep === index ? 'bold' : 'normal',
                                            color: activeStep === index ? '#6242bd' : '#666',
                                        }}
                                    >
                                        {stepForm.label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box sx={{ marginTop: '30px' }}>
                    {stepForms.length === activeStep ? (
                        <SuccessMsg handleReset={handleClickBack} />
                    ) : (
                        stepForms[activeStep]?.form
                    )}
                </Box>
            </Box>
        </>
    );
};

export default StepperForm;
