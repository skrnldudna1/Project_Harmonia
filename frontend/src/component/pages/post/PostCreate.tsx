import { useState } from "react";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    const token = localStorage.getItem("token"); 
    formData.append("file", selectedFile);
    try {
        const res = await axios.post(`${SERVER_URL}/api/auth/uploads`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
      setUploadedUrl(res.data.imageUrl);
    } catch (err) {
      console.error("업로드 실패", err);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return alert("이미지를 선택해줘!");
  
    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("file", selectedFile);
  
    try {
      // 1️⃣ 이미지 먼저 업로드
      const uploadRes = await axios.post(`${SERVER_URL}/api/auth/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const imageUrl = uploadRes.data.imageUrl;
  
      // 2️⃣ 이미지 업로드 성공 후 게시글 등록
      await axios.post(`${SERVER_URL}/api/posts`, {
        title,
        caption,
        imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ 이거 꼭!!
        },
      });
  
      alert("게시글이 등록되었어!");
      navigate("/");
    } catch (err) {
      console.error("등록 중 오류 발생", err);
      alert("등록에 실패했어 ㅠㅠ");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold"  gutterBottom></Typography>
      <TextField
        label="제목"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="캡션"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Input type="file" onChange={handleFileChange} />
      {previewImg && <img src={previewImg} alt="미리보기" style={{ width: "100%", marginTop: 10 }} />}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit} disabled={!selectedFile}>
       업로드
      </Button>
      </Box>
    </Box>
  );
};

export default PostCreate;