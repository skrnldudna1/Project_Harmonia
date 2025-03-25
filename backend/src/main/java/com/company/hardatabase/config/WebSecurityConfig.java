package com.company.hardatabase.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public WebSecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    // 사용자 프로필 변경



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())  // ✅ CSRF 보호 비활성화
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // ✅ CORS 설정
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ JWT 사용
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/signup", "/api/auth/login").permitAll()  // ✅ 회원가입 & 로그인 허용
                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()  // ✅ 업로드된 파일 접근 허용
                        .requestMatchers(HttpMethod.PATCH, "/api/auth/**").authenticated()  // ✅ 인증된 사용자만 닉네임 변경 가능
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").authenticated()
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) // ✅ JWT 필터 추가
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:3000"));  // ✅ 프론트엔드 도메인 허용
        config.setAllowedMethods(List.of("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


}
