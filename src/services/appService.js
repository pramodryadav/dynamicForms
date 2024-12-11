import { postRequest, getRequest } from "../utilities/httpsRequest";
import { CONFIG } from "../config";
const API_ENDPOINTS = CONFIG.endPoints;

const getAppData = async (params = {}) => {
    try {

        const response = await getRequest(API_ENDPOINTS["get-app-data"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

export {
    getAppData,
   


}