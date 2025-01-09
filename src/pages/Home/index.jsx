import React from 'react';

import useProjects from './hooks/useProjects'
import ListProject from './components/Projects'
import ProjectData from './components/ProjectData'
import Loader from '../../components/Loader';



const Projects = () => {
    const {
        projects,
        handleChange,
        selectedProject,
        handleClickBack,
        loading
    } = useProjects()
    return (
        <>
        <Loader open={loading}/>
            {
                !selectedProject && <ListProject
                    projects={projects}
                    handleChange={handleChange}
                    selectedProject={selectedProject}
                />
            }

            {
                selectedProject &&
                <>
                    
                    <ProjectData 
                       project={selectedProject}
                       backToProjects={handleClickBack}
                    />
                </>
            }
        </>
    )
}

export default Projects
