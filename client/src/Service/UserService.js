
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export const addUser = async (user) => {
    return await axios.post(`${BASE_URL}/admin/register`, user, getAuthHeaders());
};

export const deleteUser = async (id) => {
    return await axios.delete(`${BASE_URL}/admin/users/${id}`, getAuthHeaders());
};

export const fetchUsers = async () => {
    return await axios.get(`${BASE_URL}/admin/users`, getAuthHeaders());
};
