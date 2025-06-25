import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export const addItem = async (item) => {
    return await axios.post(`${BASE_URL}/admin/items`, item, getAuthHeaders());
};

export const deleteItem = async (itemId) => {
    return await axios.delete(`${BASE_URL}/admin/items/${itemId}`, getAuthHeaders());
};

export const fetchItems = async () => {
    return await axios.get(`${BASE_URL}/items`, getAuthHeaders());
};
