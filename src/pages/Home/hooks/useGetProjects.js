import { useState, useEffect } from "react";
import { getProjects } from "../../../services/subProjectService";
import { toast } from "react-toastify";


const useGetProjects = () => {
    const [selectedProject, setSelectedProject] = useState("");
    const [loading, setLoading] = useState(false);

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await getProjects();
            if (res.data.status === "error") {
                toast.error(res.data.message);
                return
            }

            setProjects(res.data.data)

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setSelectedProject(e.target.value)

    }

    const handleClickBack = () => {
        setSelectedProject("")
    }


    return {
        projects,
        handleChange,
        selectedProject,
        handleClickBack,
        loading
    }
}

export default useGetProjects