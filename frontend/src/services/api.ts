import axios from 'axios'

const URL = import.meta.env.VITE_BACKEND_URL

export const api = axios.create({
    baseURL: `${URL}/api/`,
});

export const adminApi = axios.create({
    baseURL: `${URL}/api/admin/`,
    withCredentials: true,
})


