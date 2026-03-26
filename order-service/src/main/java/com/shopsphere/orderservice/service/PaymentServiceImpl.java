package com.shopsphere.orderservice.service;

import com.shopsphere.orderservice.model.Payment;
import com.shopsphere.orderservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public Payment processPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order: " + orderId));
    }

    @Override
    public Payment updatePaymentStatus(Long orderId, String status) {
        Payment existingPayment = getPaymentByOrderId(orderId);
        existingPayment.setStatus(status);
        return paymentRepository.save(existingPayment);
    }
}
