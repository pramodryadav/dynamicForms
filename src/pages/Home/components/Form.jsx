import React from 'react';
import { Grid, Button } from '@mui/material';
import DynamicForm from '../../../components/DynamicForm';
import useCustomerMainForm from '../hooks/useCustomerMainForm';
import Loader from '../../../components/Loader';
import BackDrop from '../../../components/BackDrop';

function Form({ loading, openBackdrop, formik, setButtonClicked }) {

    return (
        <>
            <Loader open={loading} />
            <BackDrop open={openBackdrop} />
            <form onSubmit={formik.handleSubmit} className="formStyle">

                <Grid container item xs={12} lg={8} className="auditCard" rowSpacing={1} columnSpacing={1}>

                    <DynamicForm

                        config={formFields}

                        formik={formik}
                    />
                    <Grid item xs={12} display="flex" justifyContent="end" columnGap={1}>

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
                    </Grid>

                </Grid>

            </form>
        </>

    );
}

export default Form;
