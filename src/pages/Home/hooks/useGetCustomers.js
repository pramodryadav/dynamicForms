import { useEffect, useState } from "react";
import { getAllProjectsDetail } from "../../../services/auditform"

const useGetCustomers = () => {
    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        makeConcurrentRequest();

    }, []);


    const makeConcurrentRequest = async () => {
        try {
            setLoading(true);

            // Fetch consumers and document statuses concurrently
            const [docsRes] = await Promise.all([getAllProjectsDetail()]);

         console.log("docsRes",docsRes);
         
            const existingDocs = docsRes.data.data;

          

            setCustomers(existingDocs);

        } catch (error) {
            console.error("Error fetching customer data:", error);
        } finally {
            setLoading(false);
        }
    };



    console.log("customers ", customers)

    return {
        customers,
        loading
    }
}

export default useGetCustomers