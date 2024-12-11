import React, { useCallback, useMemo } from 'react';

import { IconButton} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Toolbar from '../../components/Toolbar';
import DataTable from '../../components/Table';
import View from './components/ViewRecord';
import EditRecord from './components/EditRecord';
import DeleteRecord from './components/DeleteRecord';

const getStatusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'status-completed';
    case 'Pending':
      return 'status-pending';
    case 'Failed':
      return 'status-failed';
    default:
      return '';
  }
};

function createData(id, name, amount, date, status, category, remarks, handleTX) {
  return {
    id,
    "Action": <div className="icon-container">
      <IconButton onClick={() => handleTX([
          { "ID": id },
          { "Name": name },
          { "Amount": amount },
          { "Date": date },
          { "Category": category },
          { "Remarks": remarks }
        ],
          "view"
        )}>
        <VisibilityIcon className="actionIcon"  />
      </IconButton>
      <IconButton onClick={() => handleTX([
          { "ID": id },
          { "Name": name },
          { "Amount": amount },
          { "Date": date },
          { "Category": category },
          { "Remarks": remarks }
        ],
          "edit"
        )}>
        <EditIcon className="actionIcon"  />
      </IconButton>
      <IconButton onClick={() => handleTX([
          { "ID": id },
          { "Name": name },
          { "Amount": amount },
          { "Date": date },
          { "Category": category },
          { "Remarks": remarks }
        ],
          "delete"
        )}>
        <DeleteIcon className="actionIcon"  />
      </IconButton>
    </div>,
    "Name": name,
    "Amount": amount,
    "Date": date,
    "Category": category,
    "Remarks": remarks,
    "Status": <span className={getStatusClass(status)}>{status}</span>

  };
}



export default function FintechTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isViewTx, setIsViewTX] = React.useState(false);
  const [isEditTx, setIsEditTX] = React.useState(false);
  const [isDeleteTx, setIsDeleteTX] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTX = (transaction, type) => {

    setSelectedTransaction(transaction);
    if (type === "view") {
      setIsViewTX(true);
    } else if (type === "edit") {
      setIsEditTX(true);
    } else {
      setIsDeleteTX(true);
    }

  };

  const handleCloseDialog = () => {
    setIsViewTX(false);
    setIsEditTX(false);
    setIsDeleteTX(false);
    setSelectedTransaction([]);
  };

  const rows = [
    createData('1', 'Transaction 001', '$120.00', '2024-08-01', 'Completed', 'Category 1', 'Remark 1', handleTX),
    createData('2', 'Transaction 002', '$300.00', '2024-08-03', 'Pending', 'Category 2', 'Remark 2', handleTX),
    createData('3', 'Transaction 003', '$450.00', '2024-08-10', 'Failed', 'Category 1', 'Remark 3', handleTX),
    createData('4', 'Transaction 004', '$200.00', '2024-08-12', 'Completed', 'Category 3', 'Remark 4', handleTX),
    createData('5', 'Transaction 005', '$320.00', '2024-08-15', 'Pending', 'Category 2', 'Remark 5', handleTX),
    createData('6', 'Transaction 006', '$120.00', '2024-08-01', 'Completed', 'Category 1', 'Remark 1', handleTX),
    createData('7', 'Transaction 007', '$300.00', '2024-08-03', 'Pending', 'Category 2', 'Remark 2', handleTX),
    createData('8', 'Transaction 008', '$450.00', '2024-08-10', 'Failed', 'Category 1', 'Remark 3', handleTX),
    createData('9', 'Transaction 009', '$200.00', '2024-08-12', 'Completed', 'Category 3', 'Remark 4', handleTX),
    createData('10', 'Transaction 010', '$320.00', '2024-08-15', 'Pending', 'Category 2', 'Remark 5', handleTX),
    createData('11', 'Transaction 011', '$120.00', '2024-08-01', 'Completed', 'Category 1', 'Remark 1', handleTX),
    createData('12', 'Transaction 012', '$300.00', '2024-08-03', 'Pending', 'Category 2', 'Remark 2', handleTX),
    createData('13', 'Transaction 013', '$450.00', '2024-08-10', 'Failed', 'Category 1', 'Remark 3', handleTX),
    createData('14', 'Transaction 014', '$200.00', '2024-08-12', 'Completed', 'Category 3', 'Remark 4', handleTX),
    createData('15', 'Transaction 015', '$320.00', '2024-08-15', 'Pending', 'Category 2', 'Remark 5', handleTX),
    createData('16', 'Transaction 016', '$120.00', '2024-08-01', 'Completed', 'Category 1', 'Remark 1', handleTX),
    createData('17', 'Transaction 017', '$800.00', '2024-08-03', 'Pending', 'Category 2', 'Remark 2', handleTX),

  ];


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

  }, []);

  const rowsToRender = useMemo(() => {
    const pageData = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return pageData.filter((eachRecord) => {
      if (searchText === "") {
        return eachRecord
      } else if (
        eachRecord["Name"].toLowerCase().includes(searchText) ||
        eachRecord["Category"].toLowerCase().includes(searchText) ||
        eachRecord["Amount"].toLowerCase().includes(searchText) ||
        eachRecord["Date"].toLowerCase().includes(searchText)
      ) {
        return eachRecord
      }
    })

  }, [page, rowsPerPage, searchText, rows]);


  return (
    <>

      <Toolbar
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        data={rows}
        handleSearch={handleSearch}
      />
      <DataTable
        columns={
          [
            "Action",
            "Name",
            "Amount",
            "Date",
            "Category",
            "Remarks",
            "Status"
          ]
        }
        page={page}
        count={rows.length}
        rows={rowsToRender}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <View isViewTx={isViewTx} handleCloseDialog={handleCloseDialog} transaction={selectedTransaction} />

      <EditRecord isEditTx={isEditTx} handleCloseDialog={handleCloseDialog} transaction={selectedTransaction} />

      <DeleteRecord isDeleteTx={isDeleteTx} handleCloseDialog={handleCloseDialog} />

    </>
  );
}



