import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MainVideo from "./main/MainVideo"; // 배경 비디오 추가
import ProductCard from "./GalleryContainer/ProductCard"; // 상품 카드
import { dummyPosts } from "../data/posts"; // 샘플 데이터
import "../App.css"; // 스타일 적용
import MainSlider from "./main/MainSlider"; // 슬라이더

const MainPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [user, setUser] = useState(null);

  // 로그인 여부 확인 (새로고침 시 유지)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.log("로그인 정보 없음");
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    let loadedImages = 0;
    const images = document.querySelectorAll(".product-card img");

    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setLoaded(true);
          }
        };
      }
    });

    if (loadedImages === images.length) {
      setLoaded(true);
    }
  }, []);

  const toggleLike = (id) => {
    setLikedPosts((prev) => {
      const updatedLikes = { ...prev, [id]: !prev[id] };
      console.log("Updated Likes: ", updatedLikes); // 디버깅용 로그
      return updatedLikes;
    });
  };

  return (
    <Box id="main-container">
      {/* 🎬 배경 비디오 */}
      <MainVideo />

      {/* 메인 컨텐츠 */}
      <div id="main-content">
        <div className="card-container">
          <Container maxWidth="lg">
            {loaded ? (
              <>
                {/* 🔹 상단 4x2 갤러리 */}
                <div className="grid-container">
                  {dummyPosts.slice(0, 8).map((post) => (
                    <ProductCard
                      key={post.id}
                      post={post}
                      isLiked={!!likedPosts[post.id]}
                      toggleLike={() => toggleLike(post.id)}
                    />
                  ))}
                </div>

                {/* 🔘 MORE 버튼 */}
                <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
                  <button className="more-button">MORE +</button>
                </Box>

                {/* 🎡 이미지 슬라이더 */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 4 }}>
                  <MainSlider />
                </Box>

                {/* text */}
                <Box sx={{ textAlign: "center", my: 3, px: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                  Illustration
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#666", mt: 1 }}>
                  イラスト
                  </Typography>
                </Box>


                {/* 🔹 추가된 하단 4x2 갤러리 */}
                  <div className="grid-container bottom-section">
                    {dummyPosts.slice(9, 17).map((post) => (
                      <ProductCard
                        key={post.id}
                        post={post}
                        isLiked={!!likedPosts[post.id]}
                        toggleLike={() => toggleLike(post.id)}
                      />
                    ))}
                  </div>

              </>
            ) : (
              <p>로딩 중...</p>
            )}
          </Container>
        </div>
      </div>
    </Box>
  );
};

export default MainPage;
