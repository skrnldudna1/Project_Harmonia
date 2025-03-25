
-- 회원정보 (회원가입 및 로그인 처리)
CREATE TABLE users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50) NOT NULL UNIQUE,
    email       VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    profile_img VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 게시글 테이블 업로드 기능
CREATE TABLE posts (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    title      VARCHAR(255),
    image_url  VARCHAR(255) NOT NULL,
    caption    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 댓글
CREATE TABLE comments (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id    BIGINT NOT NULL,
    user_id    BIGINT NOT NULL,
    content    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 좋아요
CREATE TABLE likes (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id   BIGINT NOT NULL,
    user_id   BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- 갤러리 앨범 | 유저가 만든 앨범
CREATE TABLE gallery (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    name        VARCHAR(100) NOT NULL,  -- 앨범 이름
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 앨범에 추가된 게시글
CREATE TABLE gallery_items (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    gallery_id  BIGINT NOT NULL,
    post_id     BIGINT NOT NULL,
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gallery_id) REFERENCES gallery(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);






