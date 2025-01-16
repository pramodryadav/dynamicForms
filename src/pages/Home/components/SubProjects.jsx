import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography, Grid, TextField, InputAdornment } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Select from '@mui/material/Select';
import Modal from '../../../components/Modal';
import processingImg from "../../../assets/images/process.png"
import SearchIcon from '@mui/icons-material/Search';
import useFilterItems from '../hooks/useFilterItems';
import AddSubProjectCard from './AddSubProjectCard';
import SubProjectCard from './SubProjectCard';
import useGetsubProjects from '../hooks/useGetSubProjects';
import Loader from '../../../components/Loader';

const SubProjects = ({
    handleClickExistingItem,
    handleClickNewItem,
    handleCloseModal,
    isProcessing,
    isCompleted,
    projects,

}) => {

    const {
        searchText,
        handleChangeText,
        handleChangeProject,
        handleChangeStatus,
        selectedStatus,
        selectedProject,
        clearFilter,
    } = useFilterItems(projects);
    const { searchedsubProjects, loading } = useGetsubProjects(searchText, selectedStatus, selectedProject);

    return (
        <>
            <Loader open={loading} />
            <Grid container className="m-b-20 flex row-gap-10 col-gap-10  search-filter-container">
                {/* <Grid item xs={4} sm={2} md={1.5} lg={1}>  <Button fullWidth variant="contained" startIcon={<SearchIcon />}>Search</Button></Grid> */}
                <Grid item xs={12} md={3} className="">



                    {/* <Typography>Search:</Typography> */}
                    <TextField
                        placeholder="Search your Project"
                        id="outlined-start-adornment"
                        size="small"
                        value={searchText}
                        fullWidth
                        onChange={handleChangeText}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon className="iconColor" />
                              </InputAdornment>
                            ),
                          }}
                    />

                </Grid >

           
                <Grid item xs={12} md={2} lg={2.5} className=" position-relative">

                    {/* <Typography>Project:</Typography> */}
                    <Select
                        value={selectedProject}
                        fullWidth
                        size="small"
                        onChange={handleChangeProject}
                        displayEmpty
                        sx={{pl:3}}
                    >
                        <MenuItem value="">Project Type</MenuItem>
                        {
                            projects.map((project) => {
                                return <MenuItem key={project.id} value={project}>{project?.category_name}</MenuItem>
                            })
                        }


                    </Select>

                    <FilterAltIcon className="position-absolute iconColor filterIconPosition " />

                </Grid>
                <Grid item xs={12} md={2} lg={2.5} className="position-relative">

                    <Select

                        value={selectedStatus}
                        fullWidth
                        onChange={handleChangeStatus}
                        displayEmpty
                        size="small"
                        sx={{pl:3}}
                       

                    >
                        <MenuItem value="">Status</MenuItem>
                        <MenuItem value={"draft"}>Draft</MenuItem>
                        <MenuItem value={"in_process"}>In Process</MenuItem>
                        <MenuItem value={"completed"}>Copmpleted</MenuItem>
                    </Select>
                    <FilterAltIcon className="position-absolute iconColor filterIconPosition " />

                </Grid>
                <Grid item xs={4} sm={2} md={1.5} lg={1}>
                    <Button onClick={clearFilter} fullWidth variant="outlined" startIcon={<FilterAltOffIcon />}>Clear </Button>
                </Grid>

            </Grid>

            
            <Grid container rowSpacing={3} columnSpacing={6}>


                <Grid item xs={12} sm={6} md={3} >
                    <AddSubProjectCard handleClickNewItem={handleClickNewItem} />
                </Grid>


                {Array.isArray(searchedsubProjects) &&
                    searchedsubProjects.map((subProject) => (
                        <Grid
                            item
                            xs={12} sm={6} md={3}
                            onClick={() => handleClickExistingItem(subProject)}
                            key={subProject.id}
                        >
                            <SubProjectCard subProject={subProject} />
                        </Grid>
                    ))}
            </Grid>

            <Modal open={isProcessing} showCloseIcon={false} showTitle={false} handleClose={handleCloseModal} maxWidth="xs" >
                <Box className="flex justifyC-center direction-column row-gap-10">


                    <img className="processImg" src={processingImg} alt="processing" />
                    <Typography textAlign="center">
                        Your documents are currently under processing. Please check back later for updates.
                            </Typography>

                    <Button onClick={handleCloseModal} variant="contained">ok</Button>
                </Box>
            </Modal>

            <Modal open={isCompleted} showCloseIcon={false} showTitle={false} handleClose={handleCloseModal} maxWidth="xs" >
                <Box className="flex justifyC-center direction-column row-gap-10">


                    <Box p={3} border="2px dotted #ddd">
                        <Typography variant="h4" textAlign="center">
                            Coming soon.
                            </Typography>
                    </Box>


                    <Button onClick={handleCloseModal} variant="contained">ok</Button>
                </Box>
            </Modal>


        </>
    )
}

export default SubProjects
