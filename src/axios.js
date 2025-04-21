import axios from 'axios';

const api = axios.create({
    baseURL: '/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios API Error:', {
            message: error.message,
            config: error.config,
            ...(error.response && {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            }),
            ...(error.request && !error.response && {
                request: 'No response received from server',
            }),
        });
        return Promise.reject(error);
    }
);

export default api;