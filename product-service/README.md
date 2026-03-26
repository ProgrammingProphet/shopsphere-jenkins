# ShopSphere - Product Service

The **Product Service** serves as the central catalog and inventory management system for the ShopSphere ecosystem. It handles all metadata associated with sellable goods, how they are categorized, and their real-time stock levels.

## 🏗️ Architecture

- **Framework**: Spring Boot 3.2.x (Java 17)
- **Database**: PostgreSQL (Persists Product, Category, and Inventory entities)
- **ORM**: Spring Data JPA & Hibernate
- **Containerization**: Dockerized for seamless deployment
- **Design Pattern**: Domain-Driven Design layout utilizing Data Transfer Objects (DTOs) for strictly typed API payloads.

To guarantee high scalability, this service utilizes its own independent PostgreSQL database schema, preventing contention with user or ordering transactions.

## ✨ Features

- **Product Cataloging**: Comprehensive API for retrieving, listing, creating, formatting, and deprecating products.
- **Category Taxonomy**: Group products into hierarchical categories for easier frontend filtering and querying.
- **Inventory Tracking**: Strict relational mapping to an `Inventory` model to ensure stock quantity is correctly monitored.
- **Validation Barrier**: Validates `productId` checks arriving from external microservices (like the `Order Service`) to prevent phantom orders.
- **Centralized Error Handling**: Standardized HTTP 404/400 generic error definitions using an `@ExceptionHandler` pattern to maintain clean REST contracts.

## 🚀 Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/{id}`| Retrieve product details |
| `POST` | `/api/products` | Add a new product to the catalog |
| `PUT` | `/api/products/{id}`| Update product attributes |
| `DELETE`| `/api/products/{id}`| Remove a product |
| `GET` | `/api/categories` | List product categories |
| `GET` | `/api/health` | Container health check |

## 🛠️ Usage & Setup

This service relies on a running PostgreSQL database. Production and local deployments should be coordinated via the root workspace Docker Compose file.

```bash
mvn clean package
java -jar target/product-service-0.0.1-SNAPSHOT.jar
```

Update