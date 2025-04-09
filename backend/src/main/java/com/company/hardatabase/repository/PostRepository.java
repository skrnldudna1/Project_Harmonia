package com.company.hardatabase.repository;

import com.company.hardatabase.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 전체 게시글 조회 (닉네임 포함)
    @Query("""
        SELECT 
            p.id AS id,
            p.title AS title,
            p.imageUrl AS imageUrl,
            p.caption AS caption,
            p.createdAt AS createdAt,
            u.nickname AS nickname,
            u.profileImg AS profileImg
        FROM Post p
        JOIN p.user u
        ORDER BY p.createdAt DESC
    """)
    List<PostProjection> findAllWithNickname();

    // 게시글 상세 조회
    @Query("""
        SELECT 
            p.id AS id,
            p.title AS title,
            p.imageUrl AS imageUrl,
            p.caption AS caption,
            p.createdAt AS createdAt,
            u.nickname AS nickname,
            u.profileImg AS profileImg
        FROM Post p
        JOIN p.user u
        WHERE p.id = :id
    """)
    Optional<PostProjection> findPostProjectionById(@Param("id") Long id);

    // 특정 유저의 게시글 조회 (마이페이지용)
    @Query("""
        SELECT 
            p.id AS id,
            p.title AS title,
            p.imageUrl AS imageUrl,
            p.caption AS caption,
            p.createdAt AS createdAt,
            u.nickname AS nickname,
            u.profileImg AS profileImg
        FROM Post p
        JOIN p.user u
        WHERE u.id = :userId
        ORDER BY p.createdAt DESC
    """)
    List<PostProjection> findAllByUserId(@Param("userId") Long userId);
}


