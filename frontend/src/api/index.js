import axios from 'axios';

const createInstance = (baseURL) => {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const userApi = createInstance('/api/users');
export const productApi = createInstance('/api/products');
export const categoryApi = createInstance('/api/categories');
export const orderApi = createInstance('/api/orders');

// Simple response interceptor to handle errors globally if needed
const responseHandler = response => response.data;
const errorHandler = error => {
    console.error("API Error Response:", error.response?.data);
    return Promise.reject(error);
};

[userApi, productApi, categoryApi, orderApi].forEach(api => {
    api.interceptors.response.use(responseHandler, errorHandler);
});
