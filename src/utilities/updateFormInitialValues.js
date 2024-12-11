export const updateFormInitialValues = (initialValues, customerData = {}) => {
    Object.keys(customerData).map((key) => {
        initialValues[key] = customerData[key] === null ? "" : customerData[key]
    });
    return initialValues
}