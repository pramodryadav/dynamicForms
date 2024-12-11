
import dayjs from "dayjs";
import axios from "axios";
import { CONFIG } from "../config";

const baseUrl = CONFIG.baseURL || "/api";



const getRequest = async (path, params) => {

    try {
        const uri = baseUrl + path;
        let axiosParams = {
            method: "get",
            url: uri,
            params: params,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                
            }
        }
        let res = await axios(axiosParams);
        return res;
    } catch (error) {
        throw error
    }

}

const postRequest = async (path, params) => {

    try {
        const uri = baseUrl + path;
     
        let axiosParams = {
            method: "post",
            url: uri,
            data: params,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                'Content-Type': params instanceof FormData ? 'multipart/form-data' : 'application/json'
            }
        }
        let res = await axios(axiosParams);
        return res;
    } catch (error) {
        throw error
    }

}

export { getRequest, postRequest }

