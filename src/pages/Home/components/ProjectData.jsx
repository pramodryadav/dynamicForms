import React,{memo} from 'react';

import MainCustomerform from './MainCustomerform';
import CustomerInfo from './CustomerInfo';
import CustomerDocs from './CustomerDocs';
import useAudit from '../hooks/useAudit';

import CreatedItems from './CreatedItems';
import CreateNewItem from './CreateNewItem';

const stepsLable = ['Customer', 'Customer Information', "Customer Documents"];

const ProjectData = ({project,backToProjects}) => {
    const {
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
    } = useAudit(stepsLable);

    console.log("project",project);
    

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
            {isCreateNewItem ? (
                <CreateNewItem
                    handleClickBack={handleClickBack}
                    activeStep={activeStep}
                    steps={steps}
                    stepsLable={stepsLable}
                    handleReset={handleReset}
                />
            ) : (
                    <CreatedItems
                        handleClickExistingForm={handleClickExistingForm}
                        handleClickNewItem={handleClickNewItem}
                        handleCloseModal={handleCloseModal}
                        isProcessing={isProcessing}
                        isCompleted={isCompleted}
                        handleClickBack={backToProjects}
                    />
                )}


        </>
    );
};

export default memo(ProjectData);
