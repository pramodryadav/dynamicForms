import { useState, useEffect } from "react";
import { getProjects } from "../../../services/projectService";
import { toast } from "react-toastify";


const useProjects = () => {
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
            if(res.data.status==="error"){
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

    console.log("projects",projects);
    

    return {
        projects,
        handleChange,
        selectedProject,
        handleClickBack,
        loading
    }
}

export default useProjects