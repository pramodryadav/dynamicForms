const axios = require('axios');
const CONFIG = require('../config/ExternalAPIEndpoints');

const validateUser = async (data) => {
    try {
        const response = await axios({
            method: "post",
            url: CONFIG["authEndPoints"]["validate"],
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        return response.data
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            // You can choose to throw the error with more context or handle it here
            throw new Error(`Validation failed with status ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            // The request was made but no response was received
           
            throw new Error('No response received from the validation service');
        } else {
            // Something happened in setting up the request that triggered an Error
           
            throw new Error(`Validation error: ${error.message}`);
        }
    }

};

module.exports = {
    validateUser
};
