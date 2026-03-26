# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar


# Security (optional)
RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 8080

# ENTRYPOINT ["java", "-jar", "app.jar"]
# ENTRYPOINT ["java", "-Xms128m", "-Xmx256m", "-jar", "app.jar"]

# Use JAVA_OPTS dynamically
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS:-'-Xms128m -Xmx256m'} -jar app.jar"]  #If env missing → still safe


# I use multi-stage builds, minimal base images, and run containers as non-root users with configurable runtime parameters.