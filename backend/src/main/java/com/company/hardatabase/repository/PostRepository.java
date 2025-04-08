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
    JOIN User u ON p.userId = u.id 
    ORDER BY p.createdAt DESC
    """)
    List<PostProjection> findAllWithNickname();

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
    JOIN User u ON p.userId = u.id 
    WHERE p.id = :id
    """)
    Optional<PostProjection> findPostProjectionById(@Param("id") Long id);
}
