import axios from 'axios';
import API from './api';
import { getToken } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'https://leos-zone.co.il'

const axiosInstance = axios.create({
    baseURL: API_URL
})

axiosInstance.interceptors.request.use(
    async function (config) {
        // const token = await getToken();
        const token = '118|TFazFTgdz729k0g3kL5LoOcnkCRbhbdoVtLbyjt374d88224';
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default new API(axiosInstance);
// export default axiosInstance;
