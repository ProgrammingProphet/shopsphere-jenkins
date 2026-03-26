package com.shopsphere.productservice.service;

import com.shopsphere.productservice.model.Inventory;
import com.shopsphere.productservice.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Override
    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    @Override
    public Inventory getInventoryByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for product: " + productId));
    }

    @Override
    public Inventory updateInventory(Long productId, Integer quantity) {
        Inventory existing = getInventoryByProductId(productId);
        existing.setQuantity(quantity);
        return inventoryRepository.save(existing);
    }

    @Override
    public void deleteInventoryByProductId(Long productId) {
        Inventory existing = getInventoryByProductId(productId);
        inventoryRepository.delete(existing);
    }
}
