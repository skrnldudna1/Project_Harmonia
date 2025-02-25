package com.company.cardatabase;


import com.company.cardatabase.domain.AppUser;
import com.company.cardatabase.domain.Car;
import com.company.cardatabase.domain.Owner;
import com.company.cardatabase.repository.AppUserRepository;
import com.company.cardatabase.repository.CarRepository;
import com.company.cardatabase.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
@EnableMethodSecurity
public class CardatabaseApplication implements CommandLineRunner {

	private static final  Logger logger = LoggerFactory.getLogger(
		CardatabaseApplication.class
	);

	private final CarRepository repository;
	private final OwnerRepository orepository;
	private final AppUserRepository urepository;

	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
		logger.info("Application started");
	}

	@Override
	public void run(String... args) throws Exception {

		// 소유자 객체를 추가하고 데이터베이스에 저장
		Owner owner1 = new Owner("John", "Johnson");
		Owner owner2 = new Owner("Mary", "Robinson");
		orepository.saveAll(Arrays.asList(owner1, owner2));

		repository.save(new Car("Ford", "Mustang", "red", "ADF-1121", 2023, 59000, owner1));
		repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2020, 29000, owner2));
		repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2022, 39000, owner2));

		// 모든 자동차를 가져와 Console에 로깅
		for(Car car : repository.findAll()) {
			logger.info("brand: {}, model {}", car.getBrand(), car.getModel());
		}

		// 사용자명 : user, 비밀번호 : user
		urepository.save(new AppUser("user",
				"$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));

		// 사용자명 : admin, 비밀번호 : admin
		urepository.save(new AppUser("admin",
				"$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));

	}
	
}
