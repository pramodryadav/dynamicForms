import React from 'react';
import { Table, TableBody, TableCell, TablePagination, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DataTable = ({
    columns,
    rows,
    page,
    count,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    return (
        <>
            <TableContainer component={Paper} className="table-container" sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                Array.isArray(columns) && columns.length > 0 && columns.map((column) => {
                                    return <TableCell className="header-cell" >{column}</TableCell>
                                })
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { Array.isArray(rows) && rows.length > 0 &&  rows.map((row, index) => (
                            <TableRow key={index}>
                                { Array.isArray(columns) && columns.length > 0 && columns.map((column) => {
                                    return <TableCell className="data-cell" align="center">{row[column]}</TableCell>
                                })}

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
                component="div"
                count={count || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default DataTable
