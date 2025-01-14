import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import DynamicForm from '../../../components/DynamicForm';
import useCustomerMainForm from '../hooks/useCustomerMainForm';
import Loader from '../../../components/Loader';
import BackDrop from '../../../components/BackDrop';
import useForm from '../hooks/useForm';
import Modal from '../../../components/Modal';

function Form({
    back,
    next,
    formFields,
    preResponse,
    sub_project_name,
    project_id,
    formDetail,
    isLastStep,
    currentStep }) {

    const {

        loading,
        openBackdrop,
        formik,
        setButtonClicked,
        onConfirm,
        closeModal,
        showConfirm
    } = useForm(next, preResponse, formFields, project_id, formDetail, sub_project_name,currentStep,isLastStep);

  

    return (
        <>
            <Loader open={loading} />
            <BackDrop open={openBackdrop} />
            <form onSubmit={formik.handleSubmit} className="formStyle">
                <Grid container item xs={12} lg={12} className="auditCard" rowSpacing={1} columnSpacing={1}>
                    <DynamicForm
                        config={formFields}
                        formik={formik}
                    />
                    <Grid item xs={12} display="flex" justifyContent={currentStep !== 1 ? "space-between": "end"} columnGap={1}>
                        {currentStep !== 1 && <Button variant="contained" onClick={() => back(preResponse)}>Previous</Button>}
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
                                save & Next
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

    );
}

export default Form;
