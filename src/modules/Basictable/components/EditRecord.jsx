import React from 'react'
import { TextField } from '@mui/material';
import Modal from "../../../components/Modal";

const EditRecord = ({ isEditTx, handleCloseDialog, transaction }) => {
    return (

        <Modal title="Edit" open={isEditTx} onClose={handleCloseDialog} maxWidth="sm">
            <table className="editTX">
                <tbody> {transaction.map((transaction) => {
                    const key = Object.keys(transaction);
                    return <tr key={key} >

                        <td className="editTXCell">
                            {key}
                        </td>
                        <td align="center" className="editTXCell">
                            <TextField
                                size="small"
                                defaultValue={transaction[key]}
                            />
                        </td>
                    </tr>

                })}
                </tbody>
            </table>
        </Modal>
    )
}

export default EditRecord
