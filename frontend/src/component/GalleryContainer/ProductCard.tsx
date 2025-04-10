import { Card, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const ProductCard = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.liked ?? false);
  }, [post.liked]);

  const toggleLike = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/likes/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked((prev) => !prev); // ✅ 서버 토글 성공 시 반영
    } catch (err) {
      console.error("❌ 좋아요 실패", err);
    }
  };

  return (
    <Box className="product-card-wrapper">
      <Card
        className="product-card"
        sx={{
          marginBottom: "16px",
          boxShadow: 3,
          borderRadius: 2,
          transition: "transform 0.3s",
          cursor: "pointer",
          "&:hover": { transform: "scale(1.05)" },
        }}
        onClick={() => navigate(`/product/${post.id}`)}
      >
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt={post.title}
          sx={{
            width: "100%",
            height: "616px",
            objectFit: "cover",
          }}
        />
      </Card>

      <div className="product-overlay">
        <div className="product-info">
          <h4 className="product-title">{post.title}</h4>
          <p className="product-id">{post.nickname} (님)</p>
        </div>

        <div
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
        />
      </div>
    </Box>
  );
};

export default ProductCard;