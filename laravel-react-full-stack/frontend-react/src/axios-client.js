import axios from 'axios';


//! for sending request from frontend to backend, we're gonna use axios
const axiosClient = axios.create({
    //!this is where the API URL is declared
    baseURL: `${import.meta.env.API_BASE_URL}/api`
})

//!interceptors are special functions that will be executed before the request is assigned, or after the response is received
//!adds the access token to the request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.get('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})


axiosClient.interceptors.response.use((response) => {
    //!when the promise is fullfilled, return the response itself
    return response;
}, (error) => {
    //!when the promise is rejected, return the error
    const {response} = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    } 

    //!This ensures that the original error is not swallowed, and the error handling logic outside of this interceptor (if any) can still be applied.
    throw error;
})

export default axiosClient;