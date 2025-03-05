// src/components/Header.tsx
import { AppBar,  Box, Container, Drawer, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 사이드 메뉴 상태
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

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      alert("로그아웃 성공!");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패");
    }
  };


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
                cursor: "pointer", //클릭
              }}
              onClick={() => navigate("/")} //main 페이지 이동
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
      {/* 🔑 로그인 버튼을 제일 위로 이동 */}
      <Box component="li" sx={{ marginBottom: "10px", textAlign: "center" }}>
      {user ? (
                <>
                  <Typography sx={{ fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                    👋 {user.username}님
                  </Typography>
                  <button
                    onClick={handleLogout}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "16px",
                      display: "inline-block",
                      color: "red",
                    }}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    display: "inline-block",
                  }}
                >
                  🔑 Login
                </button>
              )}
            </Box>

            {/* 메뉴 리스트 */}
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/join")} style={{ all: "unset", cursor: "pointer" }}>Join</button>
            </Box>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/mypage")} style={{ all: "unset", cursor: "pointer" }}>My page</button>
            </Box>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/order")} style={{ all: "unset", cursor: "pointer" }}>Order</button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
