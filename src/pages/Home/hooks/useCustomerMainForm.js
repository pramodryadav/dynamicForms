import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import dayjs from "dayjs";
import { getMainFrom, getCompanyCategories, submitMainForm, getCustomerByID, updateMainForm } from "../../../services/auditform"

import { initalizeForm } from "../../../utilities/InitializeForm";
import { updateFormInitialValues } from "../../../utilities/updateFormInitialValues";
import { toast } from "react-toastify";
import { getToastOptions } from "../../../utilities/generateToasOptions";

const useMainForm = (next, preResponse) => {

    const [auditForm, setAuditForm] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const toastOptions = getToastOptions(onChangeToast);

    function onChangeToast(value) {
        setOpenBackdrop(value)
    }

    useEffect(() => {

        setLoading(true);
        fetchMainForm()
            .then((data) => {
                setLoading(false);
                const { auditMain: formData, mainFormCategories: categories } = data;
                const fields = formData.data?.data?.fields || {};
                setAuditForm(fields);
                setCategories(categories?.data?.data);
            })
            .catch((error) => {
                setLoading(false);

            });
    }, []);


    useEffect(() => {
        if (preResponse.id) {
            fetchCustomerByID(preResponse.id)
        }

    }, [preResponse.id])

    const fetchCustomerByID = async (id) => {
        try {
            const params = { id };
            setLoading(true);
            const res = await getCustomerByID(params);
            setLoading(false);
            setCustomerData(res?.data?.data?.[0])
        } catch (error) {
            setLoading(false);
        }
    }

    const { initialValues, validationSchema } = initalizeForm(auditForm, {}, {});

    updateFormInitialValues(initialValues, customerData);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

        validationSchema: Yup.object().shape(
            validationSchema
        ),
        onSubmit: async (values) => {
            try {
                if (preResponse.id) {
                    values["edited_by"] = "root";
                    values["edited_on"] = dayjs().format("YYYY-MM-DD HH:mm:ss");
                    delete values["created_by"];
                    delete values["created_on"];

                } else {
                    values["created_by"] = "root";
                    values["created_on"] = dayjs().format("YYYY-MM-DD HH:mm:ss");
                    values["edited_by"] = "root";
                    values["edited_on"] = dayjs().format("YYYY-MM-DD HH:mm:ss");
                }
               
                setLoading(true);
                const res = preResponse.id ? await updateMainForm(values) : await submitMainForm(values);
                setLoading(false);
                next(res.data.data);
            } catch (error) {
                toast.error(error.message, toastOptions)
                setLoading(false);
            }
        }
    });
    
    // fetch form and value for field categroy together

    const fetchMainForm = async () => {
        try {
            const params = {
                groupid: "organization"
            }
            const [auditMainResponse, mainFormCategoriesResponse] = await Promise.all([
                getMainFrom(),
                getCompanyCategories(params)
            ]);

            return {
                auditMain: auditMainResponse,
                mainFormCategories: mainFormCategoriesResponse
            };

        } catch (err) {
            throw err;
        }
    };


    return {
        auditForm,
        categories,
        loading,
        openBackdrop,
        formik,

    }
}

export default useMainForm