import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";

const Join = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // 회원가입 요청
  const handleSignup = async () => {
    console.log("입력된 회원가입 정보:" , user);
    try {
        const response = await axios.post("http://localhost:8094/api/auth/signup", user, {
            withCredentials: true,
        });
        alert(response.data);
        navigate("/login");
    } catch (error) {
        alert("회원가입 실패! 다시 시도해주세요.");
    }
};

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#c599b6" }}>
          회원가입
        </Typography>

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
          label="이메일"
          name="email"
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

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#c599b6",
            "&:hover": { backgroundColor: "#e6b2ba" },
          }}
          onClick={handleSignup}
        >
          가입하기
        </Button>

        <Typography variant="body2" sx={{ mt: 2, color: "#777" }}>
          이미 계정이 있으신가요?{" "}
          <Button
            sx={{ color: "#c599b6", textTransform: "none", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Join;
