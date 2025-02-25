package com.company.cardatabase.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI carDatabaseOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                .title("Car REST AAPI")
                .description("My car stock")
                .version("1.0"));
    }
}
