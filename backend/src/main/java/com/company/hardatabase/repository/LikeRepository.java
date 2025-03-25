package com.company.hardatabase.repository;

import com.company.hardatabase.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByUserId(Long userId);
    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);
    void deleteByUserIdAndPostId(Long userId, Long postId);
}

