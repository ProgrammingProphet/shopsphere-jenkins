package com.shopsphere.orderservice.controller;

import com.shopsphere.orderservice.model.Payment;
import com.shopsphere.orderservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.processPayment(payment));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId));
    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<Payment> updatePaymentStatus(@PathVariable Long orderId, @RequestParam String status) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(orderId, status));
    }
}
