package com.company.hardatabase.web;


import com.company.hardatabase.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth") // 이게 중요해! 프론트랑 맞춰야 해!
@CrossOrigin(origins = "http://localhost:3001")
public class UploadController {

    private final CloudinaryService cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/uploads")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile file) throws IOException {
        String imageUrl = cloudinaryService.uploadFile(file);
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}