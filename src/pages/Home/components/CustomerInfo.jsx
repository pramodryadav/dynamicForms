import React from 'react';

import { Grid, Button } from '@mui/material';
import Loader from '../../../components/Loader';
import useCustomerInfo from "../hooks/useCustomerInfo"
import DynamicForm from '../../../components/DynamicForm';
import BackDrop from '../../../components/BackDrop';

const CustomerInfo = ({ back, next, preResponse }) => {

    const { formik,
        infoForm,
        loading,
        openBackdrop,
         } = useCustomerInfo(next, preResponse)
    return (
        <>
            <Loader open={loading} />
            <BackDrop open={openBackdrop} />
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                <Grid container item xs={12} lg={8} className="auditCard" rowSpacing={1} columnSpacing={1}>

                    <DynamicForm

                        config={infoForm}
                        formik={formik}
                        
                    />
                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <Button variant="contained" onClick={() => back(preResponse)}>Previous</Button>
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
    )
}

export default CustomerInfo
