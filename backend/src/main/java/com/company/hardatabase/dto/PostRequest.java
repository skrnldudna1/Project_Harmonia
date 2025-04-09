package com.company.hardatabase.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequest {
    private String title;
    private String caption;
    private String imageUrl;
}