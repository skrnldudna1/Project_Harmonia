import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../types";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyLikesTab = () => {
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/likes/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("🎯 좋아요 응답 확인:", res.data); // 이거 찍어봐!
        setLikedPosts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("좋아요 가져오기 실패", err));
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
  <Grid container spacing={4} justifyContent="center">
    {likedPosts.map((post) => (
      <Grid item key={post.id}>
        <Card
            sx={{
                width: 300, 
                height: 560,
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            onClick={() => navigate(`/product/${post.id}`)}
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