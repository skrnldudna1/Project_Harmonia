package com.company.hardatabase.service;


import com.company.hardatabase.domain.Like;
import com.company.hardatabase.domain.Post;
import com.company.hardatabase.domain.User;
import com.company.hardatabase.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    public List<Like> getUserLikes(Long userId) {
        return likeRepository.findByUserId(userId);
    }

    public boolean toggleLike(Long userId, Long postId) {
        Optional<Like> existingLike = likeRepository.findByUserIdAndPostId(userId, postId);
        if (existingLike.isPresent()) {
            likeRepository.deleteByUserIdAndPostId(userId, postId);
            return false; // 좋아요 취소됨
        } else {
            Like newLike = new Like();
            newLike.setUser(new User(userId));
            newLike.setPost(new Post(postId));
            likeRepository.save(newLike);
            return true; // 좋아요 추가됨
        }
    }
}

