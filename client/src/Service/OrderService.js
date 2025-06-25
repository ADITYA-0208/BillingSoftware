import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export const latestOrders = async () => {
    return await axios.get(`${BASE_URL}/orders/latest`, getAuthHeaders());
};

export const createOrder = async (order) => {
    return await axios.post(`${BASE_URL}/orders`, order, getAuthHeaders());
};

export const deleteOrder = async (id) => {
    return await axios.delete(`${BASE_URL}/orders/${id}`, getAuthHeaders());
};
