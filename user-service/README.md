# ShopSphere - User Service

The **User Service** is a core background microservice within the ShopSphere e-commerce ecosystem. It focuses on the secure and scalable management of user identities, profiles, and credential metadata.

## 🏗️ Architecture

- **Framework**: Spring Boot 3.2.x (Java 17)
- **Database**: PostgreSQL (Persists User entities)
- **ORM**: Spring Data JPA & Hibernate
- **Containerization**: Docker & Docker Compose integration
- **Pattern**: Standard MVC layered architecture (`Controller` -> `Service` -> `Repository`)

The service exposes a standard REST API and maintains its own dedicated PostgreSQL database instance to adhere to the Database-per-Service microservice pattern, ensuring loose coupling and high cohesion.

## ✨ Features

- **User Management Lifecycle**: Full CRUD operations for creating, retrieving, updating, and deleting users.
- **Robust Exception Handling**: Implements `@RestControllerAdvice` to automatically catch entities not found and bubble them up as standard JSON `ErrorResponse` payloads.
- **Microservice Integration**: Acts as the source-of-truth for the `Order Service` when validating if a `userId` is legitimate before an order can be placed.
- **Health Probes**: Exposes a `/api/health` actuator-style endpoint for readiness and liveness checks within container orchestrators.

## 🚀 Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users` | Retrieve all users |
| `GET` | `/api/users/{id}` | Retrieve a specific user |
| `POST` | `/api/users` | Register a new user |
| `PUT` | `/api/users/{id}` | Update an existing user |
| `DELETE`| `/api/users/{id}` | Delete a user |
| `GET` | `/api/health` | Container health check |

## 🛠️ Usage & Setup

This service is designed to be orchestrated via the root `docker-compose.yml`.
To run this service individually (assuming PostgreSQL is available at `localhost:5432`):

```bash
mvn clean package
java -jar target/user-service-0.0.1-SNAPSHOT.jar
```

Update
