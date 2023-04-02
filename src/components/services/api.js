import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://fundars.mysticker.io'
});

// Intercerpetor de requisições
api.interceptors.request.use(
    (config) => {
        config.headers = {
            "Access-Control-Allow-Origin": '*'
        };
        return config;
    },
    (error) => Promise.reject(error)
);