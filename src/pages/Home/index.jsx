import React from 'react';

import useProjects from './hooks/useGetProjects'
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


            <ProjectData

            />


        </>
    )
}

export default Projects
