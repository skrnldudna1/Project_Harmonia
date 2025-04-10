package com.company.hardatabase.service;

import com.company.hardatabase.domain.Like;
import com.company.hardatabase.domain.User;
import com.company.hardatabase.repository.LikeRepository;
import com.company.hardatabase.repository.PostProjection;
import com.company.hardatabase.repository.PostRepository;
import com.company.hardatabase.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.company.hardatabase.domain.Post;

import java.util.List;

@Transactional
@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public LikeService(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public void toggleLike(Long userId, Long postId) {
        if (likeRepository.existsByPostIdAndUserId(postId, userId)) {
            likeRepository.deleteByPostIdAndUserId(postId, userId);
        } else {
            Post post = postRepository.findById(postId).orElseThrow();
            User user = userRepository.findById(userId).orElseThrow();
            Like like = new Like();
            like.setPost(post);
            like.setUser(user);
            likeRepository.save(like);
        }
    }

    public List<PostProjection> getLikedPosts(Long userId) {
        return postRepository.findLikedPostsByUserId(userId);
    }
}
