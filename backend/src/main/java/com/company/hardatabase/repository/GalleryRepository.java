package com.company.hardatabase.repository;

import com.company.hardatabase.domain.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    List<Gallery> findByUserId(Long userId);
}
