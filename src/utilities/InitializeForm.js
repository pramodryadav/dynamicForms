import * as Yup from "yup";
export const initalizeForm = (formData, initialValues, validationSchema) => {
    if (typeof formData === "object" && formData !== null) {
        Object.keys(formData).map((fields) => {
            const value = fields === "blocked" || fields === "blacklist" ? "false" : ""
            initialValues[fields] = value;
            if (formData[fields]?.required) {
                validationSchema[fields] = Yup.string().required(`Please ${formData[fields]?.type === "file" ? "choose file for":"enter" } ${formData[fields]?.label}`)
            } else {
                validationSchema[fields] = Yup.string()
            }

        });
    }
    return {
        initialValues,
        validationSchema
    }
}