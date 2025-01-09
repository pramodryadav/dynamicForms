import React from 'react';

import { Grid, Button, Box } from '@mui/material';
import Loader from '../../../components/Loader';
import useCustomerInfo from "../hooks/useCustomerInfo"
import DynamicForm from '../../../components/DynamicForm';
import BackDrop from '../../../components/BackDrop';

const CustomerInfo = ({ back, next, preResponse }) => {

    const { formik,
        infoForm,
        loading,
        openBackdrop,
        setButtonClicked
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
        </>
    )
}

export default CustomerInfo
