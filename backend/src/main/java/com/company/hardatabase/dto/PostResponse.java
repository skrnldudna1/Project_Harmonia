package com.company.hardatabase.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponse {
    private Long id;
    private String title;
    private String caption;
    private String imageUrl;
    private String nickname;
    private String profileImg;
    private LocalDateTime createdAt;
    private boolean liked;
    private Long userId;
}