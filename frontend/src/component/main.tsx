import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import MainVideo from "./main/MainVideo"; // 배경 비디오 추가
import ProductCard from "./GalleryContainer/ProductCard"; // 상품 카드
import { dummyPosts } from "../data/posts"; // 샘플 데이터
import "../App.css"; // 스타일 적용
import MainSlider from "./main/MainSlider"; // 슬라이더

const MainPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

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

      {/* 4행 4열 갤러리 */}
      <div id="main-content">
        <div className="card-container">
          <Container maxWidth="lg">
            {loaded ? (
              <div className="grid-container">
                {dummyPosts.slice(0, 16).map((post) => (
                  <ProductCard
                    key={post.id}
                    post={post}
                    isLiked={!!likedPosts[post.id]}
                    toggleLike={() => toggleLike(post.id)}
                  />
                ))}
              </div>
            ) : (
              <p>로딩 중...</p>
            )}
          </Container>

          {/* 🔘 MORE 버튼 */}
          <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
            <button className="more-button">MORE +</button>
          </Box>

          {/* 🎡 이미지 슬라이더 (✅ grid-container 바로 아래로 이동) */}
          <Box sx={{ width: "100%", mt: "0px !important", display: "flex", justifyContent: "center" }}>
            <MainSlider />
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default MainPage;
