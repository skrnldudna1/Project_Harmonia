package com.company.hardatabase.repository;

import com.company.hardatabase.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    boolean existsByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);

    void deleteByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);

    List<Like> findByUserId(@Param("userId") Long userId);
}

