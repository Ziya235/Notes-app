

import axios from "axios"


import { BASE_URL } from "./contants"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    header: {
        "Content-Type" : "applocations/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accesToken = localStorage.getItem("token");
        if (accesToken) {
            config.headers.Authorization = `Bearer ${accesToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;


