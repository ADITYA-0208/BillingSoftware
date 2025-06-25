import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

// Create Stripe PaymentIntent and get clientSecret
export const createStripePaymentIntent = async (data) => {
    console.log("Calling Stripe backend with data:", data);
    return await axios.post(`${BASE_URL}/payments/create-order`, data, getAuthHeaders());
};

// Optional: verify Stripe payment (only if needed)
export const verifyStripePayment = async (paymentData) => {
    return await axios.post(`${BASE_URL}/payments/verify`, paymentData, getAuthHeaders());
};
