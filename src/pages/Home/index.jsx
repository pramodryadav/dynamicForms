import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MainCustomerform from './components/MainCustomerform';
import CustomerInfo from './components/CustomerInfo';
import CustomerDocs from './components/CustomerDocs';
import useAudit from './hooks/useAudit';
import { Button, Typography } from '@mui/material';
import Customers from './components/Customers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SuccessMsg from './components/SuccessMsg';
import Modal from '../../components/Modal';
import processingImg from "../../assets/images/process.png"

const stepsLable = ['Customer', 'Customer Information', "Customer Documents"];

const Home = () => {
    const {
        activeStep,
        handleNext,
        handleClickPrevious,
        showForm,
        handleClickNewForm,
        handleClickBack,
        responseData,
        handleClickExistingForm,
        handleReset,
        handleCloseModal,
        isProcessing,
        isCompleted
    } = useAudit(stepsLable);

    const steps = [
        <MainCustomerform
            next={handleNext}
            preResponse={responseData}
        />,
        <CustomerInfo preResponse={responseData} next={handleNext} back={handleClickPrevious} />,
        <CustomerDocs preResponse={responseData} next={handleNext} back={handleClickPrevious} />
    ];

    return (
        <>
            {showForm ? (
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
            ) : (
                    <>
                        <Customers
                            handleClickExistingForm={handleClickExistingForm}
                            handleClickNewForm={handleClickNewForm}
                        />

                        <Modal open={isProcessing} showCloseIcon={false} showTitle={false} handleClose={handleCloseModal} maxWidth="xs" >
                            <Box className="flex justifyC-center direction-column row-gap-10">


                                <img className="processImg" src={processingImg} alt="processing" />
                                <Typography textAlign="center">
                                    Your documents are currently under processing. Please check back later for updates.
                            </Typography>

                                <Button onClick={handleCloseModal} variant="contained">ok</Button>
                            </Box>
                        </Modal>

                        <Modal open={isCompleted} showCloseIcon={false} showTitle={false} handleClose={handleCloseModal} maxWidth="xs" >
                            <Box className="flex justifyC-center direction-column row-gap-10">


                               <Box p={3} border="2px dotted #ddd">
                               <Typography variant="h4" textAlign="center">
                                    Coming soon.
                            </Typography>
                               </Box>
                              

                                <Button onClick={handleCloseModal} variant="contained">ok</Button>
                            </Box>
                        </Modal>
                    </>
                )}


        </>
    );
};

export default Home;
