// package in.adityakhanna.billingsoftware.controller;

// import com.razorpay.RazorpayException;
// import in.adityakhanna.billingsoftware.io.OrderResponse;
// import in.adityakhanna.billingsoftware.io.PaymentRequest;
// import in.adityakhanna.billingsoftware.io.PaymentVerificationRequest;
// import in.adityakhanna.billingsoftware.io.RazorpayOrderResponse;
// import in.adityakhanna.billingsoftware.service.OrderService;
// import in.adityakhanna.billingsoftware.service.RazorpayService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/payments")
// @RequiredArgsConstructor
// public class PaymentController {

//     private final RazorpayService razorpayService;
//     private final OrderService orderService;

//     @PostMapping("/create-order")
//     @ResponseStatus(HttpStatus.CREATED)
//     public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
//         return razorpayService.createOrder(request.getAmount(), request.getCurrency());
//     }

//     @PostMapping("/verify")
//     public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
//         return orderService.verifyPayment(request);
//     }
// }

package in.adityakhanna.billingsoftware.controller;

import in.adityakhanna.billingsoftware.io.PaymentRequest;
import in.adityakhanna.billingsoftware.io.PaymentVerificationRequest;
import in.adityakhanna.billingsoftware.io.StripeOrderResponse;
import in.adityakhanna.billingsoftware.io.OrderResponse;
import in.adityakhanna.billingsoftware.service.OrderService;
import in.adityakhanna.billingsoftware.service.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public StripeOrderResponse createStripeOrder(@RequestBody PaymentRequest request) {
        System.out.println("Received payment create-order: " + request);
        return stripeService.createPaymentIntent(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
    
}
