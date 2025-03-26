import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { AuthContext } from './AuthProvider';
import api from "../api/axios";


const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

const Login = () => {
    const { setUser } = useContext(AuthContext); // ✅ 로그인 후 유저 정보 저장
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();


     // 로그인 유지 (토큰 확인)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("✅ 자동 로그인: 토큰 존재");
      navigate("/"); // 이미 로그인된 경우 홈으로 이동
    }
  }, [navigate]);


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await api.post("/api/auth/login", credentials);
          

            console.log("✅ 로그인 응답 데이터:", response.data);
            if (!response.data.user) throw new Error("로그인 응답에 user 데이터가 없습니다.");

            const { user, token } = response.data;
            console.log("✅ 로그인 성공! 유저:", user);
            console.log("✅ 로그인 성공! 토큰:", token);

            localStorage.setItem("token", token);  // ✅ JWT 토큰 저장
            setUser(user); // ✅ 유저 정보 상태 저장 (자동 로그인 유지)

            navigate("/");
        } catch (error) {
            console.error("❌ 로그인 실패:", error.response ? error.response.data : error.message);
            alert("로그인 실패! 다시 시도해주세요.");
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
                    로그인
                </Typography>
                <form onSubmit={(e) => {
                        e.preventDefault(); // 기본 폼 제출 방지
                        handleLogin(); // 로그인 함수 실행
                    }}
                >
                    <TextField fullWidth label="아이디" name="username" variant="outlined" margin="normal" onChange={handleChange} />
                    <TextField fullWidth label="비밀번호" type="password" name="password" variant="outlined" margin="normal" onChange={handleChange} />

                    <Button fullWidth type="submit" variant="contained" sx={{ mt: 2, backgroundColor: "#c599b6", "&:hover": { backgroundColor: "#e6b2ba" } }}
                    //  onClick={handleLogin}
                     >
                        로그인
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
