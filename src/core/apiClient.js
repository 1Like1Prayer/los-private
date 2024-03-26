import axios from 'axios';
import API from './api';

const API_URL = process.env.REACT_APP_API_URL || 'https://leos-zone.co.il'
const baseToken = '127|wW2sROdO4okG5XSKFtqeNCM9NWQ9SPy5hDnuorKb5a0acfa6'

const axiosInstance = axios.create({
    baseURL: API_URL
})
axiosInstance.interceptors.request.use(
    async (config) => {
        const {data: {data: {token}}} = await axios.post('https://leos-zone.co.il/api/app/login?email=app@leos.co.il&password=UCrICsS1HD', {})
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token || baseToken}`,
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default new API(axiosInstance);
