import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";

// 🔹 샘플 데이터 (추후 API 연동 가능)
const sampleProducts = {
  1: {
    title: "아름다운 장미",
    image: "/images/sample1.jpg",
    description: "이 장미는 고급스럽고 우아한 느낌을 줍니다.",
  },
  2: {
    title: "선인장 화분",
    image: "/images/sample2.jpg",
    description: "실내에서도 잘 자라는 귀여운 선인장입니다.",
  },
  3: {
    title: "바닷가 풍경",
    image: "/images/sample3.jpg",
    description: "바닷가에서 찍은 멋진 풍경 사진입니다.",
  },
};

const ProductDetail = () => {
  const { id } = useParams(); // 🔹 URL에서 상품 ID 가져오기
  const product = sampleProducts[id] || null;

  if (!product) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5">상품을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <Grid container spacing={4}>
        {/* 🔹 상품 이미지 (왼쪽 상단) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "10px", textAlign: "center" }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        {/* 🔹 상품 상세 정보 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
          <Typography variant="h6" color="gray" sx={{ marginTop: "10px" }}>{product.price}</Typography>
          <Typography variant="body1" sx={{ marginTop: "20px" }}>{product.description}</Typography>
        </Grid>
      </Grid>

      {/* 🔹 상세 설명란 (하단) */}
      <Box sx={{ marginTop: "40px", padding: "20px", borderTop: "2px solid #ddd" }}>
        <Typography variant="h5" fontWeight="bold">상세 설명</Typography>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          {product.description} <br />
          더 많은 정보를 원하시면 문의해주세요.
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetail;
