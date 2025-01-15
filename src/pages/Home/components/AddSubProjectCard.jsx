import React from 'react';
import { Card, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddSubProjectCard = ({ handleClickNewItem }) => {
  return (
    <Card className="addCustomerCard gray-top-border" onClick={handleClickNewItem}>
      <Box className="flex justify-space-between">
        <Typography variant="h6" className="customerName">
          New Customer
        </Typography>
        <IconButton className="editIcon">
          <AddIcon fontSize="small" />
        </IconButton>

      </Box>



    </Card>
  );
};

export default AddSubProjectCard;
