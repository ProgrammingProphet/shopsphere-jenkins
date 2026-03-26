package com.shopsphere.productservice.controller;

import com.shopsphere.productservice.model.Inventory;
import com.shopsphere.productservice.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.createInventory(inventory));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Inventory> getInventoryByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventoryByProductId(productId));
    }

    @PutMapping("/product/{productId}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long productId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(inventoryService.updateInventory(productId, quantity));
    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<Void> deleteInventoryByProductId(@PathVariable Long productId) {
        inventoryService.deleteInventoryByProductId(productId);
        return ResponseEntity.noContent().build();
    }
}
