package com.company.hardatabase.web;

import com.company.hardatabase.domain.Gallery;
import com.company.hardatabase.domain.GalleryItem;
import com.company.hardatabase.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Gallery>> getUserGalleries(@PathVariable Long userId) {
        return ResponseEntity.ok(galleryService.getUserGalleries(userId));
    }

    @GetMapping("/{galleryId}/items")
    public ResponseEntity<List<GalleryItem>> getGalleryItems(@PathVariable Long galleryId) {
        return ResponseEntity.ok(galleryService.getGalleryItems(galleryId));
    }
}
