# ShopSphere - Order Service

The **Order Service** is the central orchestrator for transactions within the ShopSphere architecture. It is responsible for bridging users, products, and financial payments into cohesive checkout lifecycles.

## 🏗️ Architecture

- **Framework**: Spring Boot 3.2.x (Java 17)
- **Database**: PostgreSQL (Persists Order, OrderItem, and Payment entities)
- **ORM**: Spring Data JPA & Hibernate
- **Inter-service Protocol**: Synchronous REST interactions via Spring WebFlux `WebClient`.
- **Containerization**: Fully Dockerized for scale and rapid deployment.

As the central nexus of the eCommerce platform, this service requires network access to the `User Service` and `Product Service` to validate foreign keys over HTTP before accepting an order document into its local database.

## ✨ Features

- **WebClient Orchestration**: Automatically reaches out to `http://user-service` and `http://product-service` to retrieve and assert that a checkout request contains valid IDs.
- **State Machine Enums**: Tracks complex states utilizing strong `OrderStatus` (CREATED, PAID, DELIVERED) and `PaymentStatus` (PENDING, SUCCESS, FAILED) enumerations.
- **Error Proxying**: Intelligently catches and parses HTTP `WebClientResponseException` failures from upstream microservices and relays friendly error messages back to the client.
- **Order Line Items**: Breaks generic checkout carts into scalable `OrderItem` tracking rows in the database.
- **Payment Processing**: Scaffolded hooks for payment gateways via the `PaymentController` and `PaymentService`.

## 🚀 Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Create a new order (triggers WebClient validation) |
| `GET` | `/api/orders/{id}` | Retrieve order status and calculations |
| `GET` | `/api/orders` | List all historical orders |
| `PUT` | `/api/orders/{id}/status` | Update fulfillment state of an order |
| `DELETE`| `/api/orders/{id}` | Cancel/delete an order |
| `GET` | `/api/health` | Container health check |

## 🛠️ Usage & Setup

Because the `Order Service` relies heavily on cross-service HTTP routing, attempting to run this application locally without the `User` and `Product` services running will result in `Connection Refused` exceptions during the checkout flow. Strongly recommend running via `docker-compose`.

```bash
docker-compose up -d --build
```

Update
