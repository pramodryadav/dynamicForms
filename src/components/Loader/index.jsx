import { Box } from "@mui/material";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';


const Loader = ({ open, message }) => {

    return (
        <>

            {open &&
                <Box className="loaderMainContainer">

                    <Box>
                    <CircularProgress className="loaderImg"/>
                       
                        <span variant="customh3" >{message}</span>

                    </Box>

                </Box>}
        </>
    )
}

export default React.memo(Loader);