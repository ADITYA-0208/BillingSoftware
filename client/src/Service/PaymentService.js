import axios from "axios";

// Create Stripe PaymentIntent and get clientSecret
export const createStripePaymentIntent = async (data) => {
    console.log("Calling Stripe backend with data:", data);
    return await axios.post(`http://localhost:8080/api/v1.0/payments/create-order`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
};

// Optional: verify Stripe payment (only if needed)
export const verifyStripePayment = async (paymentData) => {
    return await axios.post(`http://localhost:8080/api/v1.0/payments/verify`, paymentData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });
};
