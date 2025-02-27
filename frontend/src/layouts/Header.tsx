// src/components/Header.tsx
import { AppBar,  Box, Container, Drawer, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 사이드 메뉴 상태

  return (
    <>
      {/* 상단 배너 */}
      <Box
        sx={{
          position: "fixed", 
          zIndex: 100, 
          top: 0,
          left: 0,
          width: "100%",
          height: "40px",
          backgroundColor: "#ffc0cb",
          borderBottom: "1px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
          overflowX: "hidden",
        }}
      >
        Harmonia! <strong style={{ margin: "0 5px" }}>NEW</strong> UP 3000 POINT
      </Box>

      {/* 네비게이션 바 */}
      <AppBar
        position="fixed"
        sx={{
          top: "40px",
          zIndex: 99,
          left: 0,
          width: "100%",
          height: "46px",
          borderBottom: "1px solid #000",
          backgroundColor: "#fff",
          boxShadow: "none",
          overflowX: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            height: "50px",
            padding: "0 20px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowX: "hidden",
            margin: "0 auto",
          }}
        >
          
          {/* 햄버거 메뉴 버튼 */}
          <IconButton onClick={() => setMenuOpen(true)} sx={{ position: "absolute", left: "10px", padding: 0 }}>
            <img src="/images/bar.png" alt="메뉴" style={{ width: "20px", height: "30px", cursor: "pointer" }} />
          </IconButton>

            {/* 로고 */}
            <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "200px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <img
              src="/images/logo2.png"
              alt="Harmonia 로고"
              style={{
                maxWidth: "160px",
                height: "auto",
                objectFit: "contain",
                paddingTop: "10px",
              }}
            />
          </Box>

          {/* 검색 & 유저 버튼 */}
          <Box sx={{ position: "absolute", right: "10px", display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton onClick={() => navigate("/search")} sx={{ padding: 0 }}>
              <img src="/images/돋보기.png" alt="검색" style={{ width: "22px", height: "30px", cursor: "pointer" }} />
            </IconButton>
            <IconButton onClick={() => navigate("/user")} sx={{ padding: 0 }}>
              <img src="/images/user.png" alt="유저" style={{ width: "25px", height: "23px", cursor: "pointer" }} />
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      {/* 사이드 메뉴 (드로어) */}
      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 250, padding: "20px", fontFamily: "serif" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>MENU</Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/")} style={{ all: "unset", cursor: "pointer" }}>🏠 Home</button>
            </Box>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/search")} style={{ all: "unset", cursor: "pointer" }}>📰 피드</button>
            </Box>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/cart")} style={{ all: "unset", cursor: "pointer" }}>✏️ 만들기</button>
            </Box>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/profile")} style={{ all: "unset", cursor: "pointer" }}>💬 커뮤니티</button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
