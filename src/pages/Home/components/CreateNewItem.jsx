import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import SuccessMsg from './SuccessMsg';

const CreateNewItem = ({
    handleClickBack,
    activeStep,
    steps,
    stepsLable,
    handleReset
}) => {
    return (
        <>

            <Button variant="contained" onClick={handleClickBack}>Back</Button>

            <Box sx={{ width: { xs: "100%", lg: "50%" } }} className="padding-20 margin-auto">
                <Stepper activeStep={activeStep}>
                    {stepsLable.map((label, index) => (
                        <Step key={label} completed={activeStep > index}>
                            <StepLabel
                                StepIconProps={{
                                    icon: activeStep > index
                                        ? <CheckCircleIcon className="checkIconStepper" />
                                        : <div className="stepper" style={{
                                            backgroundColor: activeStep === index ? '#6242bd' : 'gray',
                                        }}>
                                            {index + 1}
                                        </div>
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {stepsLable.length === activeStep ? <SuccessMsg handleReset={handleReset} /> : <Box>
                {steps[activeStep]}
            </Box>}
        </>
    )
}

export default CreateNewItem
