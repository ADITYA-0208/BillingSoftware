import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (data) => {
    return await axios.post(`${BASE_URL}/login`, data);
};
