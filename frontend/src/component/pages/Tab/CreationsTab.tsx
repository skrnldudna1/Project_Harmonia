import { useState } from "react";
import { Box, IconButton, Input, Typography, Grid } from "@mui/material";
import { Upload, CloudUpload } from "@mui/icons-material";
import axios from "axios";

const API_URL = "http://localhost:8094/api";

const CreationsTab = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${API_URL}/uploads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedImages((prev) => [...prev, response.data.imageUrl]);
      setSelectedFile(null);
      setPreviewImg(null);
      alert("이미지가 성공적으로 업로드되었습니다!");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}></Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} width="100%">
        <Input type="file" onChange={handleFileChange} sx={{ display: "none" }} id="upload-file" />
        <label htmlFor="upload-file">
          <IconButton component="span" size="small" sx={{ mr: 1 }}>
            <Upload fontSize="small" />
          </IconButton>
        </label>
        <IconButton size="small" color="primary" onClick={handleUpload} disabled={!selectedFile}>
          <CloudUpload fontSize="small" />
        </IconButton>
      </Box>
      {previewImg && (
        <Box textAlign="center" mb={2}>
          <img src={previewImg} alt="미리보기" style={{ width: "200px", borderRadius: "8px" }} />
        </Box>
      )}
      <Grid container spacing={2}>
        {uploadedImages.map((image, index) => (
          <Grid item xs={4} key={index}>
            <img src={image} alt={`업로드된 이미지 ${index}`} style={{ width: "100%", borderRadius: "8px" }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreationsTab;