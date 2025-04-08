package com.company.hardatabase.web;

import com.company.hardatabase.domain.Post;
import com.company.hardatabase.repository.PostProjection;
import com.company.hardatabase.security.CustomUserDetails;
import com.company.hardatabase.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3001")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostProjection>> getPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }


    // 게시글
    @GetMapping("/{id}")
    public ResponseEntity<PostProjection> getPostById(@PathVariable("id") Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/my")
    public ResponseEntity<List<PostProjection>> getMyPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        System.out.println("🔥 로그인한 유저 ID: " + userDetails);  // 여기 추가!!
        return ResponseEntity.ok(postService.findPostsByUserId(userDetails.getId()));
    }

}
