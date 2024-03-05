import axios from 'axios';
const BASE_URL = 'https://7dev-code-test.lcc7.online/api/v1';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});