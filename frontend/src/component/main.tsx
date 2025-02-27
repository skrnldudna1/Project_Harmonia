import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import MainVideo from "./main/MainVideo"; // 배경 비디오 추가
import Masonry from "react-masonry-css"; 
import ProductCard from "./GalleryContainer/ProductCard"; // 상품 카드
import { dummyPosts } from "../data/posts"; // 샘플 데이터
import "../App.css"; // 스타일 적용

const breakpointColumnsObj = {
  
  default: 4, // 최대 4열
  1200: 3, // 화면 크기에 따라
  800: 2, //작은화면
  500: 1, //모바일
};

const MainPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 모든 이미지가 로드된 후 Masonry 실행
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

  return (
    <Box id="main-container">
      {/* 🎬 배경 비디오 */}
      <MainVideo />

      {/* Masonry 갤러리 */}
      <div id="main-content">
        <div className="card-container"> 
          
          <Container maxWidth="lg"> 
            {loaded ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="gallery"
                columnClassName="gallery-column"
              >
                {dummyPosts.map((post) => (
                  <ProductCard key={post.id} post={post} />
                ))}
              </Masonry>
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
