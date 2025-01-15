import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs'
import { capitalizeString } from '../../../utilities/capitalizeString';

const border = {
  in_process: "orange-top-border",
  draft: "blue-top-border",
  completed: "green-top-border"
}

const text = {
  in_process: "orange-text",
  draft: "blue-text",
  completed: "green-text"
}

const icons = {
  in_process: <InfoIcon fontSize="small" />,
  draft: <EditIcon fontSize="small" />,
  completed: <VisibilityIcon fontSize="small" />
}

const SubProjectCard = ({ customer }) => {

  return (
    <Card className={`customerCard ${border[customer?.status]}`}>


      <Box className="flex justify-space-between">
        <Typography variant="h6" className="customerName">
          {customer.project_title}
        </Typography>
        <IconButton className="editIcon">
       { icons[customer?.status]}
        </IconButton>

      </Box>

      <Typography variant="body2" className={`customerStatus`}>
        Status: <span className={`${text[customer?.status]}`}>{capitalizeString(customer.status)}</span>
      </Typography>
      <Box className="flex justify-end">
        <Typography variant="body2" className="customerStatus">
          Date: {dayjs(customer.edited_on).format("DD-MM-YYYY")}
        </Typography>
      </Box>


    </Card>
  );
};

export default SubProjectCard;
