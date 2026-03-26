package com.shopsphere.productservice.service;

import com.shopsphere.productservice.model.Product;
import java.util.List;

public interface ProductService {
    Product createProduct(Product product);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    Product updateStock(Long id, Integer quantityChange);

    Product updateProduct(Long id, Product product);

    void deleteProduct(Long id);
}
