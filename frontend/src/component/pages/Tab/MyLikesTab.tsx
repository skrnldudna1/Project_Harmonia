import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../types";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyLikesTab = () => {
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/likes/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setLikedPosts(res.data))
      .catch((err) => console.error("좋아요 가져오기 실패", err));
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={4}>
        {likedPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={() => navigate(`/product/${post.id}`)}
            >
              <CardMedia
                component="img"
                height="550"
                image={post.imageUrl}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.nickname} 님
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyLikesTab;