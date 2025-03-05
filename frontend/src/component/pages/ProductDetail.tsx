import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, IconButton, TextField, Dialog } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const sampleProducts = {
  1: {
    title: "아름다운 장미",
    image: "/images/A/A1.jpg",
    description: "이 장미는 고급스럽고 우아한 느낌을 줍니다.",
    user: { name: "우수희", profileImage: "/images/user1.jpg", bio: "오렌지색을 사랑하는 공주입니다." },
  },
  2: {
    title: "웃음",
    image: "/images/A/A3.jpg",
    description: "하하하하ㅏ하하하하",
    user: { name: "곰수희", profileImage: "/images/A/A3.jpg", bio: "웃지라도 않으면 진짜 살 수 없잖아 ㅠ" },
  },
  3: {
    title: "딸기맛",
    image: "/images/A/A25.jpg",
    description: "바닷가에서 찍은 멋진 풍경 사진입니다.",
    user: { name: "후라", profileImage: "/images/A/A25.jpg", bio: "파도를 보면 마음이 편안해지는 사람 🌊" },
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = sampleProducts[id] || null;

  // 좋아요 상태 & 애니메이션 상태 추가
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [openModal, setOpenModal] = useState(false); // ✅ 이미지 모달 상태 추가

  // 컴포넌트 마운트 시 최상단으로 이동 + 이미지 페이드 인 효과
  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(true);
  }, []);

  // 좋아요 버튼 클릭 시 애니메이션 효과 추가
  const toggleLike = () => {
    setLiked(!liked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  if (!product) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5">이미지를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "40px", maxWidth: "1200px", margin: "auto", display: "flex", gap: "20px" }}>
      {/* 왼쪽: 이미지 + 뒤로가기 버튼 */}
      <Box
        sx={{
          position: "relative",
          flex: 1,
          maxWidth: "600px",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <IconButton sx={{ position: "absolute", top: 10, left: 10, bgcolor: "white" }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: "8px" }}>
          {/* ✅ 클릭 시 모달 오픈 */}
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: "auto", objectFit: "cover", cursor: "pointer" }}
            onClick={() => setOpenModal(true)}
          />
        </Paper>
      </Box>

      {/* 오른쪽: 게시글 정보 */}
      <Box sx={{ flex: 1 }}>
        {/* 🔹 좋아요 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <IconButton
            onClick={toggleLike}
            sx={{
              width: 48,
              height: 48,
              transition: "transform 0.3s ease-in-out, opacity 0.2s ease-in-out",
              transform: animate ? "scale(1.4)" : "scale(1)",
              opacity: animate ? 0.8 : 1,
            }}
          >
            <img
              src={liked ? "/images/like_filled.png" : "/images/like.png"}
              alt="Like"
              width="40px"
              height="40px"
            />
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>

        {/* 제목 + 작성자 */}
        <Typography variant="h4" fontWeight="bold">
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Avatar src={product.user.profileImage} alt={product.user.name} sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography variant="h6">{product.user.name}</Typography>
            <Typography variant="body2" color="gray">{product.user.bio}</Typography>
          </Box>
        </Box>

        {/* 설명 */}
        <Typography variant="body1" sx={{ mt: 3 }}>{product.description}</Typography>

        {/* 댓글 입력창 */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold">어떠셨나요?</Typography>
          <TextField fullWidth placeholder="댓글을 추가하고 대화를 시작하세요." variant="outlined" sx={{ mt: 2 }} />
        </Box>
      </Box>

      {/* ✅ 이미지 클릭 시 원본 보기 모달 */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="lg">
        <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={product.image} alt={product.title} style={{ width: "100%", height: "auto", maxWidth: "900px" }} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProductDetail;