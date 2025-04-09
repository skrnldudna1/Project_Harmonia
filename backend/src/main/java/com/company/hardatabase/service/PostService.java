package com.company.hardatabase.service;

import com.company.hardatabase.domain.Post;
import com.company.hardatabase.domain.User;
import com.company.hardatabase.dto.PostRequest;
import com.company.hardatabase.repository.PostProjection;
import com.company.hardatabase.repository.PostRepository;
import com.company.hardatabase.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository,UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // ✨ nickname 포함한 projection으로 가져오기
    public List<PostProjection> getAllPosts() {
        return postRepository.findAllWithNickname();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // 메인페이지용
    public Optional<PostProjection> getPostById(Long id) {
        return postRepository.findPostProjectionById(id);
    }


    // 마이페이지용
    public List<PostProjection> findPostsByUserId(Long userId) {
        return postRepository.findAllByUserId(userId);
    }

    // 작성
    public Post createPost(Long userId, PostRequest postRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        Post post = new Post();
        post.setUser(user); // 작성자 설정
        post.setTitle(postRequest.getTitle());
        post.setCaption(postRequest.getCaption());
        post.setImageUrl(postRequest.getImageUrl());

        return postRepository.save(post);
    }


}
