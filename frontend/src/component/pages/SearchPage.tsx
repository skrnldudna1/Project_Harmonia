import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts/search`, {
          params: { keyword },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setResults(res.data);
      } catch (err) {
        console.error("검색 실패", err);
      }
    };

    fetchData();
  }, [keyword]);

  const handlePostClick = (postId: number) => {
    navigate(`/product/${postId}`);
  };

  return (
    <Box sx={{ padding: "80px 20px" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        🔍 검색 결과: "<strong>{keyword}</strong>"
      </Typography>

      {results.length === 0 ? (
        <Typography variant="body1">검색 결과가 없습니다.</Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {results.map((post) => (
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
                onClick={() => handlePostClick(post.id)}
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
      )}
    </Box>
  );
};

export default SearchPage;