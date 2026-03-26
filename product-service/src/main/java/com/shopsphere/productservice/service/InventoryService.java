package com.shopsphere.productservice.service;

import com.shopsphere.productservice.model.Inventory;

public interface InventoryService {
    Inventory createInventory(Inventory inventory);

    Inventory getInventoryByProductId(Long productId);

    Inventory updateInventory(Long productId, Integer quantity);

    void deleteInventoryByProductId(Long productId);
}
