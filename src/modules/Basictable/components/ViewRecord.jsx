import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import Modal from "../../../components/Modal"

const View = ({ isViewTx, transaction, handleCloseDialog }) => {
    return (
        <Modal title="View" open={isViewTx} onClose={handleCloseDialog} maxWidth="sm">
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {transaction.map((item, index) => {
                            const key = Object.keys(item);
                            return <TableRow key={key}>
                                <TableCell variant="head">{key}</TableCell>
                                <TableCell align="left">{item[key]}</TableCell>

                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Modal>
    )
}

export default View
