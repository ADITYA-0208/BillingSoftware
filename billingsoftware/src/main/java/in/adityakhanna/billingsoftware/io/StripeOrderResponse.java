package in.adityakhanna.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StripeOrderResponse {
    private String id;
    private Long amount;
    private String currency;
    private String status;
    private String clientSecret;
}
