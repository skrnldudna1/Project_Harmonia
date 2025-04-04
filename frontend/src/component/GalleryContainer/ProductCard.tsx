import { Card, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ post, isLiked, toggleLike }) => {
  const navigate = useNavigate();

  return (
    <Box className="product-card-wrapper">
      <Card
        className="product-card"
        sx={{
          marginBottom: "16px",
          boxShadow: 3,
          borderRadius: 2,
          transition: "transform 0.3s",
          cursor: "pointer", // 🔹 클릭 가능한 UI로 변경
          "&:hover": { transform: "scale(1.05)" },
        }}
        onClick={() => navigate(`/product/${post.id}`)} // 🔹 클릭 시 이동
      >
        {/* 📷 상품 이미지 */}
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt={post.title}
          sx={{
            width: "100%", // 고정 너비
            height: "616px", // 고정 높이
            objectFit: "cover",
          }}
        />
      </Card>

      {/* 상품 정보 + 좋아요 버튼 (product-overlay 내부) */}
      <div className="product-overlay">
        <div className="product-info">
          <h4 className="product-title">{post.title}</h4>
          <p className="product-id">{post.nickname} (님)</p>
        </div>
        <div 
          className={`like-button ${isLiked ? "liked" : ""}`} 
          onClick={(e) => {
            e.stopPropagation(); // 🔹 좋아요 버튼 클릭 시 상세 이동 방지
            toggleLike();
          }}
        ></div>
      </div>
    </Box>
  );
};

export default ProductCard;
