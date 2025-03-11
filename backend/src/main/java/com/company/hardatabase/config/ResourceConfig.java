package com.company.hardatabase.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**") // ✅ URL 매핑
                .addResourceLocations("file:uploads/") // ✅ 실제 파일이 저장된 위치 (프로젝트 루트)
                .setCachePeriod(3600); // 캐싱 설정 (선택)
    }
}
