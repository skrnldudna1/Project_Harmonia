package com.company.hardatabase.repository;

import com.company.hardatabase.domain.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryItemRepository extends JpaRepository<GalleryItem, Long> {
    List<GalleryItem> findByGalleryId(Long galleryId);
}
