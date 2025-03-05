package com.company.hardatabase.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true); // ✅ 쿠키 허용
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // ✅ 프론트엔드 도메인 허용
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // ✅ 모든 HTTP 메서드 허용
        config.setAllowedHeaders(Arrays.asList("*")); // ✅ 모든 헤더 허용
        config.setExposedHeaders(Arrays.asList("Authorization", "Content-Type")); // ✅ 응답 헤더 노출

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
