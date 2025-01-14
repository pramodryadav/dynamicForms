import React from 'react';
import { Grid, Typography, Card } from '@mui/material';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';


const ProjectItems = ({ handleSelectProject,projects }) => {
   
    return (
        <Grid container spacing={3} className='projectsContainer'>
            <Grid item xs={12}>
                <Typography className='projectTitle' align="center">
                    Choose a Project
                </Typography>
            </Grid>

            {projects.map((project) => (
                <Grid
                    key={project.id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    onClick={() => handleSelectProject(project)}
                >
                    <Card className="projectCard" >
                        <Grid sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '10px' }}>
                            <DocumentScannerOutlinedIcon className='documentIcon' />
                            <Typography variant="h6" className='projectName'>
                                {project.category_name}
                            </Typography>
                        </Grid>

                        <Typography className='projectDesc'>
                            {project.descr}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectItems;
