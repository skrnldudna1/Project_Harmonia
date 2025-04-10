import { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Card, CardMedia, CardContent } from "@mui/material";
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
        const token = localStorage.getItem("token");

        const res = await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/likes/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

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
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                onClick={() => navigate(`/product/${post.id}`)}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="550"
                  image={post.imageUrl}
                  alt={post.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {post.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CreationsTab;