package com.company.hardatabase.web;

import com.company.hardatabase.domain.Post;
import com.company.hardatabase.domain.User;
import com.company.hardatabase.dto.PostRequest;
import com.company.hardatabase.dto.PostResponse;
import com.company.hardatabase.repository.PostProjection;
import com.company.hardatabase.security.CustomUserDetails;
import com.company.hardatabase.service.PostService;
import com.company.hardatabase.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3001")
@Slf4j
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final UserService userService;


//    @GetMapping
//    public ResponseEntity<List<PostProjection>> getPosts() {
//        return ResponseEntity.ok(postService.getAllPosts());
//    }

    // 작성
    @PostMapping
    public ResponseEntity<Post> createPost(
            @RequestBody PostRequest postRequest,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        System.out.println("userDetails: " + userDetails);
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Post post = postService.createPost(userDetails.getId(), postRequest);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }


    // 게시글
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails == null ? null : userDetails.getId();

        return postService.getPostById(id)
                .map(projection -> {
                    PostResponse response = postService.convertToPostResponse(projection, userId);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/my")
    public ResponseEntity<List<PostProjection>> getMyPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        System.out.println("🔥 로그인한 유저 ID: " + userDetails);  // 여기 추가!!
        return ResponseEntity.ok(postService.findPostsByUserId(userDetails.getId()));
    }


    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null) ? userDetails.getId() : null;

        List<PostProjection> projections = postService.getAllPosts(); // projection 가져옴
        List<PostResponse> responseList = projections.stream()
                .map(p -> postService.convertToPostResponse(p, userId)) // liked 포함!
                .toList();

        return ResponseEntity.ok(responseList);
    }

}

