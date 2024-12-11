import React from 'react';
import { Tooltip, Box, Menu, MenuItem, Grid, TextField } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import SearchIcon from '@mui/icons-material/Search';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import PrintIcon from '@mui/icons-material/Print';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { handlePrint } from '../../utilities/print';
import { handleExportCSV } from '../../utilities/ExportCsv';

const Toolbar = ({ handleSearch,handleMenuOpen, anchorEl, handleMenuClose, data }) => {
    return (
        <Grid className="filterOptionsTooltip"
            sx={{ flexDirection: { xs: 'row', md: 'row' } }}>
            <TextField
                variant="outlined"
                placeholder="Search…"
                size="small"
                InputProps={{
                    startAdornment: (
                        <SearchIcon sx={{ color: '#979797', mr: 1 }} />
                    ),
                    classes: { root: 'search-field' }
                }}
                onChange={handleSearch}
                sx={{ ml: 2, flexGrow: 1, maxWidth: '200px' }}
            />

            <Box className="filterOptionsTooltipBox">
                <Tooltip title="Refresh">
                    <RefreshOutlinedIcon className="tooltipIcon" onClick={() => window.location.reload()} />
                </Tooltip>
            </Box>
            <Box className="filterOptionsTooltipBox">
                <Tooltip title="Print/Export">
                    <LocalPrintshopOutlinedIcon className="tooltipIcon" onClick={handleMenuOpen} />
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={()=>handlePrint(handleMenuClose)}>
                    Print
          </MenuItem>
                <MenuItem onClick={()=>handleExportCSV(data,handleMenuClose)}>
                    Export CSV
          </MenuItem>
            </Menu>
        </Grid>
    )
}

export default Toolbar
