import { useState } from "react";

const useFilterItems = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");


    const handleChangeText = (e) => {
        setSearchText(e.target.value)
    }

    const handleChangeProject = (event) => {
        setSelectedProject(event.target.value)
    }
    const handleChangeStatus = (event) => {
        setSelectedStatus(event.target.value)
    }

    const clearFilter = () => {
        setSelectedProject("");
        setSelectedStatus("");
    }

    return {
        searchText,
        handleChangeText,
        selectedProject,
        handleChangeProject,
        handleChangeStatus,
        selectedStatus,
        clearFilter
    }
}

export default useFilterItems