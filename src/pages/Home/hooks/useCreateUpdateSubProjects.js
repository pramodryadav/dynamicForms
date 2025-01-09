import { useCallback, useState } from "react";

const useCreateUpdateSubProjects = (step) => {

    const [activeStep, setActiveStep] = useState(0);
    const [subProjectDetail, setSubProjectDetail] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCreateNewItem, setIsCreateNewItem] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setIsCreateNewItem(false);
    }

    const handleReset = () => {

        setSubProjectDetail(null);
        setSelectedProject(null)

    }

    const handleClickBack = () => {

        setSubProjectDetail(null);
        setSelectedProject(null)
    }

    const handleClickNewItem = (preRes) => {
        setIsCreateNewItem(true);
        // setSubProjectDetail(null);
    }



    const handleClickExistingItem = (data) => {

        if (data.doc_status === "new") {
            setSubProjectDetail(data);
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
        setIsCreateNewItem(false);
    }


    return {

        isCreateNewItem,
        handleClickNewItem,
        handleClickBack,
        subProjectDetail,
        handleClickExistingItem,
        handleReset,
        handleCloseModal,
        isProcessing,
        isCompleted,
        handleSelectProject,
        selectedProject
    }
}

export default useCreateUpdateSubProjects