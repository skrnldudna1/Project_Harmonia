package com.company.hardatabase.service;

import com.company.hardatabase.domain.Post;
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

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    //게시글
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

}
