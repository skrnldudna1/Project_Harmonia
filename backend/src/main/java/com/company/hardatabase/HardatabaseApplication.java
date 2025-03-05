package com.company.hardatabase;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.company.hardatabase.repository")
public class HardatabaseApplication {

    public static void main(String[] args) {
        SpringApplication.run(HardatabaseApplication.class, args);
    }
}
