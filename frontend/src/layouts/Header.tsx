import { AppBar, Avatar, Box, Container, Drawer, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); 
  const { user, logout } = useAuth();  // ✅ AuthProvider에서 상태 가져오기

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
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
          <IconButton onClick={() => setMenuOpen(true)} sx={{ position: "absolute", left: "10px", padding: 0 }}>
            <img src="/images/bar.png" alt="메뉴" style={{ width: "20px", height: "30px", cursor: "pointer" }} />
          </IconButton>

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
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </Box>

          <Box sx={{ position: "absolute", right: "10px", display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton onClick={() => navigate("/search")} sx={{ padding: 0 }}>
              <img src="/images/돋보기.png" alt="검색" style={{ width: "22px", height: "30px", cursor: "pointer" }} />
            </IconButton>
            <IconButton onClick={() => navigate(user ? "/user" : "/login")} sx={{ padding: 0 }}>
            <Avatar
              src={
                user?.profileImg
                  ? `${user.profileImg}?v=${Date.now()}` // ✅ 캐시 무효화까지 포함!
                  : "/images/user.png"
              }
              sx={{ width: "25px", height: "25px", cursor: "pointer" }}
            />
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 250, padding: "20px", fontFamily: "serif" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>MENU</Typography>

          <Box component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
            <Box component="li" sx={{ marginBottom: "10px", textAlign: "center" }}>
              {user ? (
                <>
                  <Typography sx={{ fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                    {user.username}님
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
                    Logout
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
                  Login
                </button>
              )}
            </Box>

            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/join")} style={{ all: "unset", cursor: "pointer" }}>Join</button>
            </Box>
            <Box component="li" sx={{ marginBottom: "10px" }}>
              <button onClick={() => navigate("/user")} style={{ all: "unset", cursor: "pointer" }}>My page</button>
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
