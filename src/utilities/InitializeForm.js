import * as Yup from "yup";
export const initalizeForm = (formData, initialValues, validationSchema) => {
    if (typeof formData === "object" && formData !== null) {
        Object.keys(formData).map((field) => {
            const value = field === "blocked" || field === "blacklist" ? "false" : ""
            initialValues[field] = value;
            if (formData[field]?.required) {
                // Handle validation regex safely
              
                
                const regex = formData[field]?.validation
                    ? new RegExp(formData[field].validation)
                    : null;

                let validation = Yup.string();
              

                if (regex) {
                    validation = validation.matches(
                        regex,
                        formData[field]?.error_message || "Invalid input"
                    );
                }

                validationSchema[field] = validation.required(
                    formData[field]?.placeholder || formData[field]?.error_message || "This field is required"
                );
            } else {
                validationSchema[field] = Yup.string()
            }

        });
    }
    return {
        initialValues,
        validationSchema
    }
}