package com.company.hardatabase.repository;

import java.time.LocalDateTime;

public interface PostProjection {
    Long getId();
    String getTitle();
    String getImageUrl();
    String getCaption();
    LocalDateTime getCreatedAt();
    String getNickname();
    String getProfileImg();
}