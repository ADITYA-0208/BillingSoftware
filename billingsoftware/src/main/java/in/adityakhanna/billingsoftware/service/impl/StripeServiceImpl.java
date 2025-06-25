package in.adityakhanna.billingsoftware.service.impl;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import in.adityakhanna.billingsoftware.io.StripeOrderResponse;
import in.adityakhanna.billingsoftware.service.StripeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeServiceImpl implements StripeService {

    private final String stripeSecretKey;

    public StripeServiceImpl(@Value("${stripe.secret.key}") String stripeSecretKey) {
        this.stripeSecretKey = stripeSecretKey;
        Stripe.apiKey = this.stripeSecretKey;
    }

    @Override
    public StripeOrderResponse createPaymentIntent(Double amount, String currency) {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (amount * 100)) // Stripe expects amount in the smallest currency unit
                .setCurrency(currency.toLowerCase())
                .build();

        try {
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return StripeOrderResponse.builder()
                    .id(paymentIntent.getId())
                    .amount(paymentIntent.getAmount())
                    .currency(paymentIntent.getCurrency())
                    .status(paymentIntent.getStatus())
                    .clientSecret(paymentIntent.getClientSecret())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Stripe PaymentIntent", e);
        }
    }
}
