import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddCustomerCard = ({ handleClickNewForm }) => {
  return (
    <Card className="addCustomerCard" onClick={handleClickNewForm}>
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

export default AddCustomerCard;
