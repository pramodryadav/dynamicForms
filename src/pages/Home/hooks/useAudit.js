import { useCallback, useState } from "react";

const useAudit = (step) => {

    const [activeStep, setActiveStep] = useState(0);
    const [responseData, setResponseData] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCreateNewItem, setIsCreateNewItem] = useState(false);

    const handleNext = (data) => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setResponseData(data)

    };

    const handleReset = () => {

        setIsCreateNewItem(false);
        setActiveStep(0);

    }

    const handleClickBack = () => {
        setIsCreateNewItem(false);
        setActiveStep(0);
        setResponseData({});
    }

    const handleClickNewItem = (preRes) => {
        setIsCreateNewItem(true);
        setResponseData({});
    }

    const handleClickPrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const handleClickExistingForm = (data) => {
       
        if (data.doc_status === "new") {
            setResponseData(data);
            setIsCreateNewItem(true)
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
        isCreateNewItem,
        handleClickNewItem,
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