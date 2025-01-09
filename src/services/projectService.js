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

export {
    getProjects,
   


}