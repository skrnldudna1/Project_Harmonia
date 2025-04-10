package com.company.hardatabase.web;

import com.company.hardatabase.domain.Like;
import com.company.hardatabase.domain.Gallery;
import com.company.hardatabase.domain.GalleryItem;
import com.company.hardatabase.repository.PostProjection;
import com.company.hardatabase.security.CustomUserDetails;
import com.company.hardatabase.service.LikeService;
import com.company.hardatabase.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "http://localhost:3001")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> toggleLike(@PathVariable("postId") Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        likeService.toggleLike(userDetails.getId(), postId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/my")
    public ResponseEntity<List<PostProjection>> getLikedPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(likeService.getLikedPosts(userDetails.getId()));
    }
}