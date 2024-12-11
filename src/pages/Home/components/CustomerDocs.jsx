import React from 'react';


import { Grid, Button, Typography } from '@mui/material';
import Loader from '../../../components/Loader';
import useCustomerDocs from '../hooks/useCustomerDocs';
import DynamicForm from '../../../components/DynamicForm';
import { capitalizeString } from '../../../utilities/capitalizeString';

const CustomerDocs = ({ back, next, preResponse }) => {
    const { formik,
        docForm,
        onChange,
        loading,
        custDoucments,
        baseUrl } = useCustomerDocs(next, preResponse)

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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"

                        >
                            Submit
                    </Button>
                    </Grid>

                </Grid>

            </form>
        </>
    )
}

export default CustomerDocs
