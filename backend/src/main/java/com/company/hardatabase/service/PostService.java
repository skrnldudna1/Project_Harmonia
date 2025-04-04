package com.company.hardatabase.service;

import com.company.hardatabase.domain.Post;
import com.company.hardatabase.repository.PostProjection;
import com.company.hardatabase.repository.PostRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
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

    public Optional<PostProjection> getPostById(Long id) {
        return postRepository.findPostProjectionById(id);
    }

}
