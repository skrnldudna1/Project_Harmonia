import { Card, CardMedia, Box } from "@mui/material";

const ProductCard = ({ post, isLiked, toggleLike }) => {
  return (
    <Box className="product-card-wrapper">
      <Card
        className="product-card"
        sx={{
          marginBottom: "16px",
          boxShadow: 3,
          borderRadius: 2,
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        {/* 📷 상품 이미지 */}
        <CardMedia
          component="img"
          image={post.image}
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
          <p className="product-id">{post.id} (님)</p>
          <h4 className="product-price">꽃</h4>
        </div>
        <div 
          className={`like-button ${isLiked ? "liked" : ""}`} 
          onClick={toggleLike}
        ></div>
      </div>
    </Box>
  );
};

export default ProductCard;
