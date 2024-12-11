import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs'
import { capitalizeString } from '../../../utilities/capitalizeString';

const border = {
  processing: "orange-top-border",
  new: "blue-top-border",
  completed: "green-top-border"
}

const text = {
  processing: "orange-text",
  new: "blue-text",
  completed: "green-text"
}

const icons = {
  processing: <InfoIcon fontSize="small" />,
  new: <EditIcon fontSize="small" />,
  completed: <VisibilityIcon fontSize="small" />
}

const CustomerCard = ({ customer }) => {

  return (
    <Card className={`customerCard ${border[customer?.doc_status]}`}>


      <Box className="flex justify-space-between">
        <Typography variant="h6" className="customerName">
          {customer.full_name}
        </Typography>
        <IconButton className="editIcon">
       { icons[customer?.doc_status]}
        </IconButton>

      </Box>

      <Typography variant="body2" className={`customerStatus`}>
        Status: <span className={`${text[customer?.doc_status]}`}>{capitalizeString(customer.doc_status)}</span>
      </Typography>
      <Box className="flex justify-end">
        <Typography variant="body2" className="customerStatus">
          Date: {dayjs(customer.edited_on).format("DD-MM-YYYY")}
        </Typography>
      </Box>


    </Card>
  );
};

export default CustomerCard;
