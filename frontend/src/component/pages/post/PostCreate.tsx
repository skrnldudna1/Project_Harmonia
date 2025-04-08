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
    formData.append("file", selectedFile);
    try {
      const res = await axios.post(`${SERVER_URL}/api/auth/uploads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedUrl(res.data.imageUrl);
    } catch (err) {
      console.error("업로드 실패", err);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedUrl) return alert("이미지 업로드가 필요해!");
    try {
      await axios.post(`${SERVER_URL}/api/posts`, {
        title,
        caption,
        imageUrl: uploadedUrl,
      });
      alert("게시글이 등록되었어!");
      navigate("/");
    } catch (err) {
      console.error("게시글 등록 실패", err);
      alert("오류가 났어 ㅠㅠ");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>게시글 작성</Typography>
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
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleImageUpload} disabled={!selectedFile}>
          이미지 업로드
        </Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit} disabled={!uploadedUrl}>
          게시글 등록
        </Button>
      </Box>
    </Box>
  );
};

export default PostCreate;