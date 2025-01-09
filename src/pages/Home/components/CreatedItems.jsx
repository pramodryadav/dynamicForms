import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Customers from './Customers';
import Modal from '../../../components/Modal';
import processingImg from "../../../assets/images/process.png"
import Projects from './Projects';

const CreatedItems = ({
    handleClickExistingItem,
    handleClickNewItem,
    handleCloseModal,
    isProcessing,
    isCompleted,

}) => {

    return (
        <>
            <Customers
                handleClickExistingItem={handleClickExistingItem}
                handleClickNewItem={handleClickNewItem}

            />

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

export default CreatedItems
