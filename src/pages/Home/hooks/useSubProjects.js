import { useCallback, useState } from "react";

const useSubProjects = (step) => {

    const [subProjectDetail, setSubProjectDetail] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCreateNewItem, setIsCreateNewItem] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setIsCreateNewItem(false);
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


        if (data.status === "draft") {
            setSubProjectDetail(data);
        }
        if (data.status === "in_process") {
            setIsProcessing(true);
        }

        if (data.status === "completed") {
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
        handleCloseModal,
        isProcessing,
        isCompleted,
        handleSelectProject,
        selectedProject
    }
}

export default useSubProjects