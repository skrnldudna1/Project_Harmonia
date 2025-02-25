package com.company.cardatabase.web;

import com.company.cardatabase.domain.Car;
import com.company.cardatabase.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CarController {

    private final CarRepository repository;

    @GetMapping("/cars")
    public Iterable<Car> getCars(){

        return repository.findAll();
    }
}
