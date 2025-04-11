package com.company.hardatabase.service;

import com.company.hardatabase.domain.Comment;
import com.company.hardatabase.domain.Post;
import com.company.hardatabase.domain.User;
import com.company.hardatabase.dto.CommentRequest;
import com.company.hardatabase.dto.CommentResponse;
import com.company.hardatabase.repository.CommentRepository;
import com.company.hardatabase.repository.PostRepository;
import com.company.hardatabase.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public List<CommentResponse> getComments(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId).stream()
                .map(comment -> {
                    CommentResponse res = new CommentResponse();
                    res.setId(comment.getId());
                    res.setContent(comment.getContent());
                    res.setCreatedAt(comment.getCreatedAt());
                    res.setNickname(comment.getUser().getNickname());
                    res.setProfileImg(comment.getUser().getProfileImg());
                    return res;
                }).toList();
    }

    public Comment createComment(Long postId, Long userId, CommentRequest request) {
        Post post = postRepository.findById(postId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setContent(request.getContent());

        return commentRepository.save(comment);
    }

    public void updateComment(Long commentId, Long userId, CommentRequest request) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));

        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        comment.setContent(request.getContent());
        commentRepository.save(comment);
    }

    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));

        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }
}