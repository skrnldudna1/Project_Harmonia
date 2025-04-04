import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // ✅ 추가!
import MainVideo from "./main/MainVideo";
import ProductCard from "./GalleryContainer/ProductCard";
import "../App.css";
import MainSlider from "./main/MainSlider";
import { useAuth } from "./AuthProvider";

const MainPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]); // ✅ DB에서 불러올 게시글 리스트
  const [likedPosts, setLikedPosts] = useState({});
  const { user, setUser } = useAuth();

  // ✅ DB에서 게시글 목록 불러오기
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`)
      .then((res) => {
        console.log("📦 불러온 게시글:", res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error("❌ 게시글 불러오기 실패:", err));
  }, []);

  // ✅ 이미지 로딩 상태 확인
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
  }, [posts]); // ✅ posts가 로드될 때마다 이미지 로딩 확인

  const toggleLike = (id) => {
    setLikedPosts((prev) => {
      const updatedLikes = { ...prev, [id]: !prev[id] };
      return updatedLikes;
    });
  };

  return (
    <Box id="main-container">
      <MainVideo />
      <div id="main-content">
        <div className="card-container">
          <Container maxWidth="lg">
            {loaded ? (
              <>
                {/* 🔹 상단 4x2 갤러리 */}
                <div className="grid-container">
                  {posts.slice(0, 8).map((post) => (
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
                  {posts.slice(8, 16).map((post) => (
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