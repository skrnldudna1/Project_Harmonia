import { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthProvider";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

interface Post {
  id: number;
  title: string;
  caption: string;
  imageUrl: string;
  createdAt: string;
  nickname: string;
  profileImg?: string;
}

const CreationsTab = () => {
  const { user } = useAuth(); // 로그인한 유저 정보
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/posts/my`, {
          withCredentials: true, // 세션 기반 로그인일 경우 필요
        });
        setPosts(res.data);
      } catch (err) {
        console.error("내 게시글 불러오기 실패 💥", err);
      }
    };

    fetchMyPosts();
  }, [user]);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={() => navigate("/post/create")}>
          <AddPhotoAlternateIcon />
        </IconButton>
      </Box>

      {posts.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>
          아직 작성한 게시글이 없어요 😢
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <img
                src={post.imageUrl}
                alt={post.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.caption}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CreationsTab;