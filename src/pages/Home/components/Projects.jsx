import React from 'react';
import { Grid, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Projects = ({
    projects,
    handleChange,
    selectedProject
}) => {
    console.log("selectedProject",selectedProject);
    
    return (
        <Grid container className="center">
            <Grid item container xs={12} lg={4} className="projectContainer">
                <Grid item xs={12} >
                    <Typography sx={{ fontSize: "2.25rem" }}>Choose a project</Typography>
                </Grid>
                <Grid item xs={12} >
                    <Select
                        fullWidth
                        value={selectedProject}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Select a project</em>
                        </MenuItem>
                        {projects.map((project) => {
                            return <MenuItem key={project.id} value={project}>{project.title}</MenuItem>
                        })}

                    </Select>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Projects
