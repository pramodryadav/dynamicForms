import React from 'react';
import { Grid, Button } from '@mui/material';
import DynamicForm from '../../../components/DynamicForm';
import useCustomerMainForm from '../hooks/useCustomerMainForm';
import Loader from '../../../components/Loader';
import BackDrop from '../../../components/BackDrop';

function MainCustomerForm({ next,preResponse }) {

    const {
        auditForm,
        categories,
        loading,
        openBackdrop,
        formik
    } = useCustomerMainForm(next,preResponse);

    return (
        <>
            <Loader open={loading} />
            <BackDrop open={openBackdrop} />
            <form onSubmit={formik.handleSubmit} className="formStyle">

                <Grid container item xs={12} lg={8} className="auditCard" rowSpacing={1} columnSpacing={1}>

                    <DynamicForm
                       
                        config={auditForm}
                        categories={categories}
                        formik={formik}
                    />
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            
                        >
                            Next
                        </Button>
                    </Grid>

                </Grid>

            </form>
        </>

    );
}

export default MainCustomerForm;
