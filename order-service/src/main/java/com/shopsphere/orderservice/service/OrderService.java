package com.shopsphere.orderservice.service;

import com.shopsphere.orderservice.model.Order;
import com.shopsphere.orderservice.model.dto.OrderRequest;
import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequest request);

    Order getOrderById(Long id);

    List<Order> getOrdersByUserId(Long userId);

    List<Order> getAllOrders();

    Order updateOrderStatus(Long id, String status);

    void deleteOrder(Long id);
}
