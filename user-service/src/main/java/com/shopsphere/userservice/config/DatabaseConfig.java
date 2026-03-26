package com.shopsphere.userservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.shopsphere.userservice.repository")
public class DatabaseConfig {
}
