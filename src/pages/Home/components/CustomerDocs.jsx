import React from 'react';


import { Grid, Button, Typography, Box } from '@mui/material';
import Loader from '../../../components/Loader';
import useCustomerDocs from '../hooks/useCustomerDocs';
import DynamicForm from '../../../components/DynamicForm';
import { capitalizeString } from '../../../utilities/capitalizeString';
import Modal from '../../../components/Modal';

const CustomerDocs = ({ back, next, preResponse }) => {
    const { formik,
        docForm,
        onChange,
        loading,
        custDoucments,
        setButtonClicked,
        onConfirm,
        showConfirm,
        closeModal
    } = useCustomerDocs(next, preResponse)

    return (
        <>
            <Loader open={loading} />
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                <Grid container item xs={12} lg={8} className="auditCard" rowSpacing={1} columnSpacing={1}>

                    <DynamicForm

                        config={docForm}
                        onChange={onChange}
                        formik={formik}
                    />

                    {
                        Object.keys(custDoucments).length > 0 ? Object.keys(custDoucments).map((key) => {
                            console.log("custDoucments[key]", custDoucments[key]);

                            return <Grid key={key} item xs={12} md={6} className="fieldContainer">
                                <Typography className="form-label" variant="body1" >{capitalizeString(key)} file</Typography>
                                <img className="docImage" src={custDoucments[key] || ""} alt="doc image" />

                            </Grid>
                        }) : null
                    }
                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <Button variant="contained" onClick={back}>Previous</Button>
                        <Box display="flex" columnGap={1}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setButtonClicked("draft")}
                            >
                                save as draft
                        </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setButtonClicked("next")}
                            >
                                Final Submit
                        </Button>
                        </Box>
                    </Grid>

                </Grid>

            </form>
            <Modal open={showConfirm} showCloseIcon={false} showTitle={false} handleClose={closeModal} maxWidth="xs" >
                            <Box className="flex justifyC-center direction-column row-gap-10">


                              
                                <Typography textAlign="center">
                                   This is a final submit. Once submitted , documents cannot be modified.<br /> Are you sure ?
                            </Typography>
                            <Box display="flex" justifyContent="center" columnGap={1}>
                            <Button onClick={closeModal} variant="outlined">Cancel</Button>
                            <Button onClick={onConfirm} variant="contained">Yes</Button>
                            </Box>
                                
                                
                            </Box>
                        </Modal>
        </>
    )
}

export default CustomerDocs
