import { postRequest, getRequest } from "../utilities/httpsRequest";
import { CONFIG } from "../config";
const API_ENDPOINTS = CONFIG.endPoints;



const getCustomerByID = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["get-customer-by-id"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}





const getCustomerInfoByID = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["get-customer-info-by-id"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}




const updateInfoForm = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["info-form-update"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const updateDocStatus = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["update-doc-status"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}



const submitMainForm = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["mainform-submit"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const updateMainForm = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["mainform-update"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const uploadFile = async (params = {}) => {
    try {
       
        const response = await postRequest(API_ENDPOINTS["upload-file"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const getInfoFrom = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["info-form"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const getDocFrom = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["doc-form"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}






const getCompanyCategories = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["company-categories"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}
export {
    getCompanyCategories,
    submitMainForm,
    getInfoFrom,
    getDocFrom,
    updateInfoForm,
    uploadFile,
    getCustomerByID,
    updateMainForm,
    getCustomerInfoByID,
    updateDocStatus,

    
}