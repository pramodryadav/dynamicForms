import { useState } from "react";
import MainCustomerform from '../components/MainCustomerform';
import CustomerInfo from '../components/CustomerInfo';
import CustomerDocs from '../components/CustomerDocs';

const useStepperForm = (subProjectDetail) => {
    const [activeStep, setActiveStep] = useState(0);
    const [responseData, setResponseData] = useState(subProjectDetail);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const toastOptions = getToastOptions(onChangeToast);

    function onChangeToast(value) {
        setOpenBackdrop(value)
    }

    const handleNext = (data) => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setResponseData(data)

    };

    const handleClickPrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const stepsLable = ['Customer', 'Customer Information', "Customer Documents"];
    const steps = [
        <MainCustomerform
            next={handleNext}
            preResponse={responseData}
        />,
        <CustomerInfo preResponse={responseData} next={handleNext} back={handleClickPrevious} />,
        <CustomerDocs preResponse={responseData} next={handleNext} back={handleClickPrevious} />
    ];
    return {
        activeStep,
        responseData,
        handleNext,
        handleClickPrevious,
        stepsLable,
        steps
    }
}

export default useStepperForm