import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    },
});

export const fetchDashboardData = async () => {
    return await axios.get(`${BASE_URL}/dashboard`, getAuthHeaders());
};
