import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export const addCategory = async (category) => {
    return await axios.post(`${BASE_URL}/admin/categories`, category, getAuthHeaders());
};

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${BASE_URL}/admin/categories/${categoryId}`, getAuthHeaders());
};

export const fetchCategories = async () => {
    return await axios.get(`${BASE_URL}/categories`, getAuthHeaders());
};
