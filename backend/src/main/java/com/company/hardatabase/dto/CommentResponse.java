package com.company.hardatabase.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponse {
    private Long id;
    private String content;
    private String nickname;
    private String profileImg;
    private LocalDateTime createdAt;
}