package com.shopsphere.orderservice.service;

import com.shopsphere.orderservice.model.Payment;

public interface PaymentService {
    Payment processPayment(Payment payment);

    Payment getPaymentByOrderId(Long orderId);

    Payment updatePaymentStatus(Long orderId, String status);
}
