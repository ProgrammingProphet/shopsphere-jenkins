package com.shopsphere.orderservice.service;

import com.shopsphere.orderservice.model.Order;
import com.shopsphere.orderservice.model.dto.OrderRequest;
import com.shopsphere.orderservice.repository.OrderRepository;
import com.shopsphere.orderservice.exception.OrderNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${app.services.user-service}")
    private String userServiceUrl;

    @Value("${app.services.product-service}")
    private String productServiceUrl;

    @Override
    public Order createOrder(OrderRequest request) {
        // verify user exists
        Object userResponse = webClientBuilder.build().get()
                .uri(userServiceUrl + "/api/users/" + request.getUserId())
                .retrieve()
                .bodyToMono(Object.class)
                .block();

        if (userResponse == null)
            throw new RuntimeException("User not found");

        // get product details
        Object productResponse = webClientBuilder.build().get()
                .uri(productServiceUrl + "/api/products/" + request.getProductId())
                .retrieve()
                .bodyToMono(Object.class)
                .block();

        if (productResponse == null)
            throw new RuntimeException("Product not found");

        // For simplicity we aren't completely mapping the Product class here,
        // we will just assume fixed price for demonstration or map it manually.
        // In a real app we would map to a ProductDTO and extract the price.

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setProductId(request.getProductId());
        order.setQuantity(request.getQuantity());
        order.setStatus("COMPLETED");

        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrderStatus(Long id, String status) {
        Order existingOrder = getOrderById(id);
        existingOrder.setStatus(status);
        return orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        Order existingOrder = getOrderById(id);
        orderRepository.delete(existingOrder);
    }
}
