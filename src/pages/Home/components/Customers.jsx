import React from 'react';
import AddCustomerCard from './AddCustomerCard';
import { Grid, Button } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import useGetCustomers from '../hooks/useGetCustomers';
import CustomerCard from './CustomerCard';
import Loader from '../../../components/Loader';

const Customers = ({ handleClickExistingForm, handleClickNewItem,handleClickBack }) => {
    const { customers, loading } = useGetCustomers();

    return (
        <>
            <Loader open={loading} />
            <Grid container rowSpacing={3} columnSpacing={6}>
                <Grid item xs={12} >
                    <Button startIcon={<WestIcon />} onClick={handleClickBack} variant="contained">Back</Button>
                </Grid>

                <Grid item xs={12} sm={6} md={3} >
                    <AddCustomerCard handleClickNewItem={handleClickNewItem} />
                </Grid>


                {Array.isArray(customers) &&
                    customers.map((customer) => (
                        <Grid
                            item
                            xs={12} sm={6} md={3}
                            onClick={() => handleClickExistingForm(customer)}
                            key={customer.id}
                        >
                            <CustomerCard customer={customer} />
                        </Grid>
                    ))}
            </Grid>
        </>
    );
};

export default Customers;
