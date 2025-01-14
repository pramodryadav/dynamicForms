import { postRequest, getRequest } from "../utilities/httpsRequest";
import { CONFIG } from "../config";
const API_ENDPOINTS = CONFIG.endPoints;

const getProjects = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["list-projects"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}


const getAllsubProjectsDetail = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["get-projects-detail"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const getProjectForms = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["project-forms"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

const submitForm = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["submit-form"], params);
        return response;

    } catch (err) {

        let error = err.response ? err.response.data : err;
        throw error
    }

}

const updateForm = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["update-form"], params);
        return response;

    } catch (err) {

        let error = err.response ? err.response.data : err;
        throw error
    }

}



const getFromJSONData = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["form-json-data"], params);
        return response;

    } catch (err) {

        let error = err.response ? err.response.data : err;
        throw error
    }

}




export {
    getProjects,
    getAllsubProjectsDetail,
    getProjectForms,
    submitForm,
    getFromJSONData,
    updateForm

}