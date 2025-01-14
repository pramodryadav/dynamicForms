import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";


import { initalizeForm } from "../../../utilities/InitializeForm";
import { updateFormInitialValues } from "../../../utilities/updateFormInitialValues";
import { toast } from "react-toastify";
import { getToastOptions } from "../../../utilities/generateToasOptions";
import { submitForm, getFromJSONData, updateForm } from "../../../services/subProjectService";

const useForm = (next, preResponse, formFields, project_id, formDetail, sub_project_name, currentStep, isLastStep) => {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [buttonClicked, setButtonClicked] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const toastOptions = getToastOptions(onChangeToast);

    function onChangeToast(value) {
        setOpenBackdrop(value)
    }

    console.log("currentStep", currentStep);
    console.log("isLastStep", isLastStep);

    console.log("preResponse", preResponse);


    console.log("formDetail", formDetail);
    console.log("sub_project_name", sub_project_name);


    const subProjectId = preResponse?.subProjectId || preResponse?.id;
    console.log("subProjectId", subProjectId);


    useEffect(() => {
        if (subProjectId && formDetail?.order_id) {
            const params = {
                order_id: formDetail?.order_id,
                sub_project_id: subProjectId
            }
            fetchFromJSONData(params)
        }

    }, [subProjectId, formDetail?.order_id])

    const fetchFromJSONData = async (params) => {
        try {

            setLoading(true);
            const res = await getFromJSONData(params);

            setLoading(false);
            setFormData(res?.data?.data)
        } catch (error) {
            setLoading(false);
        }
    }

    console.log("formData", formData);


    const { initialValues, validationSchema } = initalizeForm(formFields, {}, {});
    console.log("formFields", formFields);


    updateFormInitialValues(initialValues, formData?.form_json_data);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

        validationSchema: Yup.object().shape(
            validationSchema
        ),
        onSubmit: async (values) => {

            try {
                if (!/^[a-zA-Z\s]+$/.test(sub_project_name)) {
                    toast.error("Please enter project name", toastOptions);
                    return
                    // The input value is a valid name (only letters and spaces)
                }


                if (buttonClicked === "draft") {
                    await submitFormData(values)
                } else if (buttonClicked === "next") {
                    if (isLastStep) {
                        setShowConfirm(true);
                    } else {
                        const res = await submitFormData(values);
                        if (res) next(res.data.data);
                    }

                }

            } catch (error) {
                toast.error(error.message, toastOptions)
            }

        }
    });


    const submitFormData = async (values) => {
        try {
            const params = {
                "data_project_id": project_id,
                "order_id": formDetail?.order_id,
                "status": (isLastStep && buttonClicked === "next") ? "in_process" : "draft",
                "name": formDetail?.name,
                "form_json": { fields: formFields },
                "form_json_data": values,
                "project_title": sub_project_name,
            };


            setLoading(true);
            const res = subProjectId ? await updateForm({ ...params, subProjectId }) : await submitForm(params);
            setLoading(false);
            return res;
        } catch (error) {
            setLoading(false);
            throw error


        }
    }

    // fetch form and value for field categroy together

    const onConfirm = async () => {
        try {
            setShowConfirm(false);
            const res = await submitFormData(formik.values);
            if (res) next(res.data.data);

        } catch (error) {
            toast.error(error.message, toastOptions)
        }

    }

    const closeModal = () => {
        setShowConfirm(false);
    }

    return {

        loading,
        openBackdrop,
        formik,
        setButtonClicked,
        onConfirm,
        closeModal,
        showConfirm

    }
}

export default useForm