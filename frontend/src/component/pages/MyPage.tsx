import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Grid, Button, IconButton, TextField, Modal } from "@mui/material";
import { Settings, Upload } from "@mui/icons-material";
import axios from "axios";
import styles from "./MyPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../component/AuthProvider"; // ✅ useAuth 추가

const API_URL = "http://localhost:8094/api/auth";
const SERVER_URL = "http://localhost:8094";

const MyPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // ✅ useAuth에서 유저 정보 가져오기
  const [userData, setUserData] = useState(user);
  const [newNickname, setNewNickname] = useState(user?.nickname || "");
  const [tabValue, setTabValue] = useState(0);
  const [myFeed, setMyFeed] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [previewImg, setPreviewImg] = useState(user?.profileImg ? `${SERVER_URL}${user.profileImg}` : "/images/default-profile.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // ✅ user 정보가 변경될 때 userData 갱신
  useEffect(() => {
    setUserData(user);
    setNewNickname(user?.nickname || "");
    setPreviewImg(user?.profileImg ? `${SERVER_URL}${user.profileImg}` : "/images/default-profile.png");
  }, [user]);

  // ✅ 마이페이지 데이터 가져오기
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // ✅ 토큰 추가
    })
      .then(res => setUserData(res.data))
      .catch(() => navigate("/login"));
  }, [user, navigate]);

  // ✅ 프로필 사진 변경 미리보기
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  // ✅ 변경 사항 저장 (닉네임 & 프로필 사진)
  const handleSaveChanges = async () => {
    try {
      if (!userData?.id) {
          alert("사용자 정보를 찾을 수 없습니다.");
          return;
      }

      const token = localStorage.getItem("token"); // ✅ 토큰 가져오기
      if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
      }

      let updatedUser = { ...userData };

      // ✅ 닉네임 변경 요청
      if (newNickname !== userData.nickname) {
        const nicknameResponse = await axios.put(
            `${API_URL}/${userData.id}/nickname`,
            { nickname: newNickname },
            {
                headers: { Authorization: `Bearer ${token}` }, // ✅ JWT 포함
            }
        );
        updatedUser.nickname = nicknameResponse.data.nickname;
    }

      // ✅ 프로필 사진 변경 요청
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const profileResponse = await axios.post(`${API_URL}/${userData.id}/profile-img`, formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ 토큰 추가
          },
        });

        updatedUser.profileImg = profileResponse.data.profileImg;
      }

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setPreviewImg(updatedUser.profileImg ? `${SERVER_URL}${updatedUser.profileImg}` : "/images/default-profile.png");

      alert("변경 사항이 저장되었습니다.");
      setOpenModal(false);
    } catch (error) {
      console.error("변경 저장 실패:", error);
      alert("변경을 저장하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box className={styles.myPageContainer}>
      <Box className={styles.profileSection}>
        <Box className={styles.profileContainer}>
          <Avatar
            src={userData?.profileImg ? `${SERVER_URL}${userData.profileImg}` : "/images/default-profile.png"}
            className={styles.profileAvatar}
          />
          <Typography variant="h5">{userData?.nickname || userData?.username}</Typography>
          <Typography variant="body1" color="gray">팔로잉 1 | 팔로워 5.4K</Typography>
          <IconButton className={styles.settingsButton} onClick={() => setOpenModal(true)}>
            <Settings sx={{ color: "#FF69B4" }} />
          </IconButton>
        </Box>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className={styles.modalContainer}>
          <Typography className={styles.modalTitle}>프로필 수정</Typography>
          <Avatar src={previewImg} className={styles.previewAvatar} sx={{ width: 220, height: 220, margin: "0 auto", mb: 2 }} />
          <input type="file" accept="image/*" onChange={handleProfileImageUpload} hidden id="profile-upload" />
          <label htmlFor="profile-upload" className={styles.uploadButton}>
            <Upload sx={{ mr: 1 }} />
            사진 변경
          </label>
          <TextField fullWidth className={styles.modalInput} label="닉네임 변경" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} variant="outlined" sx={{ mt: 3 }} />
          <button className={styles.modalButton} onClick={handleSaveChanges}>변경 완료</button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MyPage;
