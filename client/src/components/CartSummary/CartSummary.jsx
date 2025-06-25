import './CartSummary.css';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup.jsx";
import { createOrder, deleteOrder } from "../../Service/OrderService.js";
import toast from "react-hot-toast";

const CartSummary = ({ customerName, mobileNumber, setMobileNumber, setCustomerName }) => {
    const { cartItems, clearCart } = useContext(AppContext);

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = totalAmount * 0.01;
    const grandTotal = totalAmount + tax;

    const clearAll = () => {
        setCustomerName("");
        setMobileNumber("");
        clearCart();
    };

    const placeOrder = () => {
        setShowPopup(true);
        clearAll();
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    const deleteOrderOnFailure = async (orderId) => {
        try {
            await deleteOrder(orderId);
        } catch (error) {
            console.error("❌ Delete order failed:", error);
            toast.error("Something went wrong");
        }
    };

    const completePayment = async (paymentMode) => {
        console.log(`🟡 completePayment called with mode: ${paymentMode}`);

        if (!customerName || !mobileNumber) {
            toast.error("Please enter customer details");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const orderData = {
            customerName,
            phoneNumber: mobileNumber,
            cartItems,
            subtotal: totalAmount,
            tax,
            grandTotal,
            paymentMethod: paymentMode.toUpperCase()
        };

        setIsProcessing(true);
        try {
            console.log("🟢 Creating order:", orderData);
            const response = await createOrder(orderData);
            const savedData = response.data;

            if (response.status === 201 && paymentMode === "cash") {
                toast.success("Cash received");
                setOrderDetails(savedData);
            } else if (response.status === 201 && paymentMode === "upi") {
                console.log("🟢 Simulating Stripe Checkout success...");

                // Simulate a successful API call and UPI payment
                toast.success("Payment Successful");

                setOrderDetails({
                    ...savedData,
                    paymentDetails: {
                        simulated: true,
                        method: "UPI"
                    }
                });
            }
        } catch (error) {
            console.error("❌ Exception in completePayment:", error);
            toast.error("Payment processing failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="mt-2">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Item: </span>
                    <span className="text-light">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax (1%):</span>
                    <span className="text-light">₹{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <span className="text-light">Total:</span>
                    <span className="text-light">₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="d-flex gap-3">
                <button
                    className="btn btn-success flex-grow-1"
                    onClick={() => completePayment("cash")}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Cash"}
                </button>
                <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => completePayment("upi")}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "UPI"}
                </button>
            </div>
            <div className="d-flex gap-3 mt-3">
                <button
                    className="btn btn-warning flex-grow-1"
                    onClick={placeOrder}
                    disabled={isProcessing || !orderDetails}
                >
                    Place Order
                </button>
            </div>
            {
                showPopup && (
                    <ReceiptPopup
                        orderDetails={orderDetails}
                        onClose={() => setShowPopup(false)}
                        onPrint={handlePrintReceipt}
                    />
                )
            }
        </div>
    );
};

export default CartSummary;
