import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //백 연동
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", { 
        username: user.username, 
        password: user.password 
      }, { withCredentials: true });
  
      alert(response.data);
      navigate("/");
    } catch (error) {
      alert("로그인 실패하였습니다.");
    }
  };


  // 로그아웃 요청
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      alert("로그아웃 성공!");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패");
    }
  };
  
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* 로고 자리 */}
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#c599b6" }}>
            Harmonia
          </Typography>

          {/* 입력 필드 */}
          <TextField
            fullWidth
            label="아이디"
            name="username"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            name="password"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />

          {/* 로그인 버튼 */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#c599b6",
              "&:hover": { backgroundColor: "#e6b2ba" },
            }}
            onClick={handleLogin}
          >
            로그인
          </Button>

          {/* 회원가입 & 비밀번호 찾기 */}
          <Typography variant="body2" sx={{ mt: 2, color: "#777" }}>
            계정이 없으신가요?{" "}
            <Button
              sx={{ color: "#c599b6", textTransform: "none", fontWeight: "bold" }}
              onClick={() => navigate("/join")}
            >
              가입하기
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
