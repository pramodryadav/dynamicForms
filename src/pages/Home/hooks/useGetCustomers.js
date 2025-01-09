import { useEffect, useState } from "react";
import { getAllCustomers, getAllDocsStatus } from "../../../services/auditform"

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
            const [customersRes, docsRes] = await Promise.all([getAllCustomers(), getAllDocsStatus()]);

            const consumers = customersRes.data.data;
            const existingDocs = docsRes.data.data;

            // Create a lookup map for document statuses by customer_id
            const docStatusMap = existingDocs.reduce((map, doc) => {
                map[doc.customer_id] = doc.status;
                return map;
            }, {});

            console.log("docStatusMap", docStatusMap);


            // Map consumers with their corresponding document status
            const updatedConsumers = consumers.map((consumer) => ({
                ...consumer,
                doc_status: docStatusMap[consumer.id], // Each consumer is guaranteed to have a status
            }));

            setCustomers(updatedConsumers);

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