package com.company.hardatabase.web;

import com.company.hardatabase.domain.Like;
import com.company.hardatabase.domain.Gallery;
import com.company.hardatabase.domain.GalleryItem;
import com.company.hardatabase.service.LikeService;
import com.company.hardatabase.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired
    private LikeService likeService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Like>> getUserLikes(@PathVariable Long userId) {
        return ResponseEntity.ok(likeService.getUserLikes(userId));
    }

    @PostMapping("/{postId}/toggle")
    public ResponseEntity<Boolean> toggleLike(@RequestParam Long userId, @PathVariable Long postId) {
        boolean liked = likeService.toggleLike(userId, postId);
        return ResponseEntity.ok(liked);
    }
}