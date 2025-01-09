import React from 'react';
import { Grid, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../../components/Modal';
import useGetProjects from '../hooks/useGetProjects';

const Projects = ({
    handleSelectProject,
}) => {

    const { projects } = useGetProjects();

    return (

        <Grid container className="center ">
            <Grid item xs={12} >
                <Typography align="center" sx={{ fontSize: "2rem" }}>Choose a project</Typography>
            </Grid>



            {
                projects.map((project) => {
                    return <Grid onClick={() => handleSelectProject(project)} key={project.id} item xs={12} lg={3} className="projectContainer" >

                        <Typography variant="bold" align="center">{project.category_name}</Typography>
                        <Typography className="projectDesc">{project.descr}</Typography>



                    </Grid>
                })
            }


        </Grid>

    )
}

export default Projects
