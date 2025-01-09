import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { getInfoFrom, updateInfoForm, getCustomerInfoByID } from "../../../services/auditform"
import { initalizeForm } from "../../../utilities/InitializeForm";
import { getToastOptions } from "../../../utilities/generateToasOptions";
import { toast } from "react-toastify";


const useCustomerInfo = (next, preResponse) => {
    const [loading, setLoading] = useState(false);
    const [infoForm, setInfoForm] = useState({});
    const [custInfo, setCustInfo] = useState({});
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [buttonClicked, setButtonClicked] = useState("");
    const toastOptions = getToastOptions(onChangeToast);

    function onChangeToast(value) {
        setOpenBackdrop(value)
    }

    useEffect(() => {

        fetchInfoForm(preResponse)
    }, []);

    const fetchInfoForm = async (preResponse) => {
        try {
            setLoading(true);
            const params = { id: preResponse.id, category: preResponse.category }
            const res = await getInfoFrom(params);
            setInfoForm(res.data?.data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }

    }



    useEffect(() => {
        if (preResponse.id) {
            fetchCustInfoByID(preResponse.id)
        }

    }, [preResponse.id]);


    const fetchCustInfoByID = async (id) => {
        try {
            const params = { id };
            setLoading(true);
            const res = await getCustomerInfoByID(params);
            setLoading(false);
            setCustInfo(res?.data?.data);
        } catch (error) {
            setLoading(false);
        }
    }


    let { initialValues, validationSchema } = initalizeForm(infoForm, {}, {});

    if (custInfo.length > 0) {
        // Update initialValues based on records
        initialValues = custInfo.reduce((acc, record) => {
            if (acc.hasOwnProperty(record.field_name)) {
                acc[record.field_name] = record.field_value;
            }
            return acc;
        }, initialValues);
    } else {

    }


    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

        validationSchema: Yup.object().shape(
            validationSchema
        ),
        onSubmit: async (values) => {
            try {
                const { id, category } = preResponse;
                const params = {
                    id,
                    category,
                    formData: values
                }
                setLoading(true);
                const res = await updateInfoForm(params);
                setLoading(false);
                if (buttonClicked === "draft") {
                    // Handle save as draft logic
                } else if (buttonClicked === "next") {
                    next(res.data.data);

                }

            } catch (error) {
                setLoading(false);
                toast.error(error.message, toastOptions)
            }

        }
    });


    return {
        formik,
        infoForm,
        loading,
        openBackdrop,
        setButtonClicked
    }
}

export default useCustomerInfo