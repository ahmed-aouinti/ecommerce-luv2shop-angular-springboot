package com.luv2shopdev.ecommerce.service;

import com.luv2shopdev.ecommerce.dto.PaymentInfo;
import com.luv2shopdev.ecommerce.dto.Purchase;
import com.luv2shopdev.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
