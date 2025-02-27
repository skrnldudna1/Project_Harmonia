import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // ❤️ 좋아요 아이콘 추가

const ProductCard = ({ post }) => {
  return (
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
            width: "462px", // 고정 너비
            height: "616px", //고정 높이
            objectFit: "cover",
        }}
        />

      {/* ❤️ 좋아요 버튼 */}
      <IconButton className="like-button" sx={{ position: "absolute", bottom: 10, right: 10 }}>
        <FavoriteBorderIcon />
      </IconButton>

      {/* 📝 상품 정보 */}
      <CardContent className="product-info">
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          [크림·당일배송]
        </Typography>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          29,000원
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
