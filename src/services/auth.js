import { postRequest, getRequest } from "../utilities/httpsRequest";
import { CONFIG } from "../config";
const API_ENDPOINTS = CONFIG.endPoints;


const verifyLogin = async (params = {}) => {
    try {

        const response = await postRequest(API_ENDPOINTS["verify-login"], params);
        return response;

    } catch (err) {
        let error = err.response ? err.response.data : err;
        throw error
    }

}

export {
    verifyLogin,
}