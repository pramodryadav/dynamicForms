import React from 'react';
import {  Typography, Button, Box } from '@mui/material';
import Modal from "../../../components/Modal";

const DeleteRecord = ({isDeleteTx,handleCloseDialog}) => {
    return (
        <Modal title="Delete" open={isDeleteTx} onClose={handleCloseDialog} maxWidth="sm">
            <Box className="flex direction-column row-gap-10">
                <Typography>Are you sure ! you want to delete the transaction  ?</Typography>
                <Box className="flex justify-end col-gap-10">
                    <Button onClick={handleCloseDialog} variant="contained">Cancel</Button>
                    <Button onClick={handleCloseDialog} variant="contained">
                        Yes
          </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeleteRecord
