import { useState } from "react";
import { Box, Typography, Avatar, Grid, Button, IconButton } from "@mui/material";
import { Add, Settings, MailOutline, Link, Upload } from "@mui/icons-material";
import styles from "./MyPage.module.css";

// 🔹 내가 업로드한 게시물 (피드)
const myFeed = [
  { id: 1, image: "/images/sample1.jpg", date: "2025-03-04T12:30:00Z" },
  { id: 2, image: "/images/sample2.jpg", date: "2025-03-03T10:00:00Z" },
  { id: 3, image: "/images/sample3.jpg", date: "2025-03-02T14:20:00Z" }
];

const likedPosts = [
  { id: 1, image: "/images/sample1.jpg", date: "2025-03-04T12:30:00Z" },
  { id: 2, image: "/images/sample2.jpg", date: "2025-03-03T10:00:00Z" }
];

const followingPosts = [
  { id: 4, user: "친구1", image: "/images/sample4.jpg", date: "2025-03-04T14:00:00Z" },
  { id: 5, user: "친구2", image: "/images/sample5.jpg", date: "2025-03-03T15:30:00Z" }
];

const MyPage = () => {
  const [tabValue, setTabValue] = useState(0);

  // 피드 추가
const handleAddPost = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newPost = {
        id: myFeed.length + 1,
        image: imageUrl,
        date: new Date().toISOString()
      };
      setMyFeed([newPost, ...myFeed]); // 최신순으로 정렬되도록 추가
    }
  };

  return (
    <Box className={styles.myPageContainer}>
      
      {/* 🔹 프로필 & 액션 버튼 */}
      <Box className={styles.profileSection}>
        <Box className={styles.profileContainer}>
          <Avatar src="/images/profile.png" className={styles.profileAvatar} />
          <Typography variant="h4" mt={1}>사용자명</Typography>
          <Typography variant="body1" color="gray">팔로잉 1 | 팔로워 5.4K</Typography>
          <IconButton className={styles.settingsButton}>
            <Settings sx={{ color: "#FF69B4" }} />
          </IconButton>
        </Box>
        <Box className={styles.actionButtons}>
          <IconButton className={styles.actionIcon}><MailOutline /></IconButton>
          <IconButton className={styles.actionIcon}><Link /></IconButton>
          <IconButton className={styles.actionIcon}><Upload /></IconButton>
        </Box>
      </Box>

      {/* 🔹 탭 메뉴 */}
      <Box className={styles.tabContainer}>
        <Button className={`${styles.tabButton} ${tabValue === 0 ? styles.activeTab : ""}`} onClick={() => setTabValue(0)}>피드</Button>
        <Button className={`${styles.tabButton} ${tabValue === 1 ? styles.activeTab : ""}`} onClick={() => setTabValue(1)}>좋아요</Button>
        <Button className={`${styles.tabButton} ${tabValue === 2 ? styles.activeTab : ""}`} onClick={() => setTabValue(2)}>팔로잉</Button>
      </Box>

      {/* 🔹 내 피드 탭 (내가 업로드한 사진만 보이도록) */}
      {tabValue === 0 && (
        <Grid container spacing={2} className={styles.gridContainer}>
          {[...myFeed].sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box className={styles.gridItem} sx={{ backgroundImage: `url(${post.image})`, backgroundSize: "cover" }} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* 🔹 좋아요 탭 (좋아요한 게시물 최신순 정렬) */}
      {tabValue === 1 && (
        <Grid container spacing={2} className={styles.gridContainer}>
          {[...likedPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box className={styles.gridItem} sx={{ backgroundImage: `url(${post.image})`, backgroundSize: "cover" }} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* 🔹 팔로잉 탭 (팔로잉한 사람들의 타임라인) */}
      {tabValue === 2 && (
        <Box className={styles.timelineContainer}>
          {[...followingPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
            <Box key={post.id} className={styles.timelinePost}>
              <Typography variant="body2" color="gray">{post.user} 님이 게시물을 올렸습니다.</Typography>
              <img src={post.image} alt="팔로잉 이미지" className={styles.timelineImage} />
            </Box>
          ))}
        </Box>
      )}

    </Box>
  );
};

export default MyPage;
