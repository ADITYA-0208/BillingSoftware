package in.adityakhanna.billingsoftware.service;

import in.adityakhanna.billingsoftware.io.StripeOrderResponse;

public interface StripeService {
    StripeOrderResponse createPaymentIntent(Double amount, String currency);
}
