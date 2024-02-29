import axios, { AxiosInstance } from 'axios';

// Set base URL
const baseURL = '';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
