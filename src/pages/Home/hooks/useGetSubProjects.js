import { useEffect, useState, useMemo } from "react";
import { getAllsubProjectsDetail } from "../../../services/subProjectService"

const useGetsubProjects = (searchText, selectedStatus, selectedProject) => {
    const [subProjects, setSubsubProjects] = useState([]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        makeConcurrentRequest();

    }, []);

    console.log("subProjects", subProjects);
    console.log("selectedStatus",selectedStatus);
    console.log("selectedProject",selectedProject);
    
    

    const makeConcurrentRequest = async () => {
        try {
            setLoading(true);

            // Fetch consumers and document statuses concurrently
            const [docsRes] = await Promise.all([getAllsubProjectsDetail()]);
            const existingDocs = docsRes.data.data;



            setSubsubProjects(existingDocs);

        } catch (error) {
            console.error("Error fetching customer data:", error);
        } finally {
            setLoading(false);
        }
    };
    const filteredsubProjects = useMemo(() => {
        return subProjects.filter((subProject) => {

            if(selectedStatus && selectedProject){
                return (subProject.status === selectedStatus && subProject.data_project_id === selectedProject.id);
            }else if(selectedStatus){
                return subProject.status === selectedStatus;
            }else if(selectedProject){
                return subProject.data_project_id === selectedProject.id;  
            }else{
                return true
            }
            


        })
    }, [subProjects,selectedStatus, selectedProject])

    const searchedsubProjects = useMemo(() => {
        return filteredsubProjects.filter((customer) => {

            if (!searchText) {
                return true
            }
            return customer.project_title?.toLowerCase().includes(searchText.toLowerCase());


        })
    }, [filteredsubProjects, searchText])

console.log("searchedsubProjects",searchedsubProjects);


    return {
        searchedsubProjects,
        loading
    }
}

export default useGetsubProjects