function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    return dateString.match(regex) !== null;
}

function applyDefaultValues(formData) {
    const defaultValues = {
        dob: null, // Default date value
        organization: 0,
        
        // Other fields...
    };

    for (const field in defaultValues) {
        if (!formData[field] || formData[field] === '' || (field === 'dob' && !isValidDate(formData[field]))) {
            formData[field] = defaultValues[field];
        }
    }

    return formData;
}

module.exports = {
    applyDefaultValues
}