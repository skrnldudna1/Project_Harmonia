import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Grid, Button, IconButton, TextField, Modal, Tabs, Tab } from "@mui/material";
import { Settings, Upload } from "@mui/icons-material";
import axios from "axios";
import styles from "./MyPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../component/AuthProvider"; // ✅ useAuth 추가
import CreationsTab from "./Tab/CreationsTab";
import MyLikesTab from "./Tab/MyLikesTab";
import api from "../../api/axios";
import { getUserProfile } from "../../api/auth";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${SERVER_URL}/api/auth`;


const MyPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(user);
  const [newNickname, setNewNickname] = useState(user?.nickname || "");
  const [tabValue, setTabValue] = useState(0); // ✅ 탭 상태 추가
  const [myFeed, setMyFeed] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [previewImg, setPreviewImg] = useState(user?.profileImg ? `${SERVER_URL}${user.profileImg}` : "/images/default-profile.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);


  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  

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
  
    const token = localStorage.getItem("token");
    if (!token) return;
  
    getUserProfile(token)
      .then((res) => setUserData(res.data))
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
        try {
          const nicknameResponse = await api.patch(
            `/api/auth/${userData.id}/nickname`,
            { nickname: newNickname },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          updatedUser.nickname = nicknameResponse.data.nickname;
  
        } catch (error) {
          if (error.response?.status === 409) {
            // ✅ 중복 닉네임 처리
            alert("이미 사용 중인 닉네임 입니다.");
            return;
          } else {
            alert("닉네임 변경 중 오류가 발생하였습니다.");
            return;
          }
        }
      }

      // ✅ 프로필 사진 변경 요청
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
  
        const profileResponse = await api.post(
          `/api/auth/${userData.id}/profile-img`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        updatedUser.profileImg = profileResponse.data.profileImg;
      }


      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setPreviewImg(updatedUser.profileImg ? `${SERVER_URL}${updatedUser.profileImg}` : "/images/default-profile.png");
  
      setPreviewImg(updatedUser.profileImg);
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
          src={userData?.profileImg ? `${userData.profileImg}?v=${Date.now()}` : "/images/default-profile.png"}
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
          <Avatar
            src={
              previewImg?.startsWith("data:") || previewImg?.startsWith("blob:")
                ? previewImg
                : `${previewImg}?v=${Date.now()}`
            }
            className={styles.previewAvatar}
            sx={{ width: 220, height: 220, margin: "0 auto", mb: 2 }}
          />
          <input type="file" accept="image/*" onChange={handleProfileImageUpload} hidden id="profile-upload" />
          <label htmlFor="profile-upload" className={styles.uploadButton}>
            <Upload sx={{ mr: 1 }} />
            사진 변경
          </label>
          <TextField fullWidth className={styles.modalInput} label="닉네임 변경" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} variant="outlined" sx={{ mt: 3 }} />
          <button className={styles.modalButton} onClick={handleSaveChanges}>변경 완료</button>
        </Box>
      </Modal>


      {/* 탭 */}
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        centered
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "15px", // 탭 버튼 사이 간격 일정하게 유지
            justifyContent: "center", // 모든 탭을 중앙 정렬
          },
          "& .MuiTabs-indicator": {
            display: "none", // 기본 MUI 밑줄 제거
          },
          "& .MuiTab-root": {
            color: "#777", // 기본 탭 색상 (회색)
            fontSize: "16px",
            fontWeight: 500,
            textTransform: "none",
            transition: "all 0.3s ease-in-out",
            padding: "10px 20px",
            borderRadius: "12px",
            minWidth: "120px", // 버튼 크기 일정하게 유지
            "&:hover": {
              backgroundColor: "#FFF7F3", // 마우스 오버 시 색상 변경
              color: "#000",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "#FCABBF", // 선택된 탭 배경색
            color: "#000", // 선택된 탭 글씨 검정색
            fontWeight: 600,
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Tab label="Creations" />   {/* 0 */}
        <Tab label="Gallery" />     {/* 1 */}
        <Tab label="Likes" />       {/* 2 ✅ 이게 빠졌던 거야! */}
        <Tab label="Followers" />   {/* 3 */}
      </Tabs>
      {/* 탭별 컴포넌트 불러오기 */}
      {tabValue === 0 && <CreationsTab />}
      {tabValue === 2 && <MyLikesTab />}    

    </Box>

    
  );
};

export default MyPage;
