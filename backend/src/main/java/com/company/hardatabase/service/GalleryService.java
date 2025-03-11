package com.company.hardatabase.service;

import com.company.hardatabase.domain.Gallery;
import com.company.hardatabase.domain.GalleryItem;
import com.company.hardatabase.repository.GalleryItemRepository;
import com.company.hardatabase.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private GalleryItemRepository galleryItemRepository;

    public List<Gallery> getUserGalleries(Long userId) {
        return galleryRepository.findByUserId(userId);
    }

    public List<GalleryItem> getGalleryItems(Long galleryId) {
        return galleryItemRepository.findByGalleryId(galleryId);
    }
}
