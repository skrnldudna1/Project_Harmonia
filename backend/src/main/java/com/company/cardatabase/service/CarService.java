package com.company.cardatabase.service;

import com.company.cardatabase.domain.Car;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class CarService {
    @PreAuthorize("hasRole('USER')")
    public void updateCar(Car car){

    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCar(Car car){

    }
}
