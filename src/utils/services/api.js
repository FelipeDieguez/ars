import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://fundars.mysticker.io'
    // baseURL: 'http://localhost:3100'
    baseURL: 'http://127.0.0.1:8080'
    // baseURL: 'https://ars-gxyv3.ondigitalocean.app'
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