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

        const res = await axios.get(`${SERVER_URL}/api/posts/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data);
      } catch (err) {
        console.error("내 게시글 불러오기 실패 💥", err);
      }
    };

    fetchMyPosts();
  }, [user]);

  return (
    <Box sx={{ padding: 3 }}>
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
        <Grid container spacing={4} justifyContent="center">
          {posts.map((post) => (
            <Grid item key={post.id}>
              <Card
                onClick={() => navigate(`/product/${post.id}`)}
                sx={{
                  width: 300,
                  height: 560,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  image={post.imageUrl}
                  alt={post.title}
                  sx={{
                    height: 500,
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    px: 2,
                    py: 1,
                    height: 70,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.2,
                      height: "50%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: 1.2,
                      height: "50%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
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