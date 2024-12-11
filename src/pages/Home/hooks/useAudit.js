import { useCallback, useState } from "react";

const useAudit = (step) => {

    const [activeStep, setActiveStep] = useState(0);
    const [responseData, setResponseData] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleNext = (data) => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setResponseData(data)

    };

    console.log("activeStep", activeStep);


    const handleReset = () => {

        setShowForm(false);
        setActiveStep(0);

    }

    const handleClickBack = () => {
        setShowForm(false);
        setActiveStep(0);
        setResponseData({});
    }

    const handleClickNewForm = (preRes) => {
        setShowForm(true);
        setResponseData({});
    }

    const handleClickPrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const handleClickExistingForm = (data) => {
       
        if (data.doc_status === "new") {
            setResponseData(data);
            setShowForm(true)
        }
        if (data.doc_status === "processing") {
            setIsProcessing(true);
        }

        if (data.doc_status === "completed") {
            setIsCompleted(true);
        }

      

    }

    const handleCloseModal = () => {
        setIsProcessing(false);
        setIsCompleted(false);
    }


    return {

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
    }
}

export default useAudit