import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, IconButton, TextField, Dialog } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Button } from "@mui/material";


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  

  // 좋아요 상태 & 애니메이션 상태 추가
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [openModal, setOpenModal] = useState(false); // ✅ 이미지 모달 상태 추가


  //댓글
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/posts/${id}`;
        const token = localStorage.getItem("token");
        const res = await axios.get(url,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          });
        setProduct(res.data);
        setLiked(res.data.liked); // <- 여기에 liked가 false인지 true인지 확인!!
        console.log("불러온 liked 값:", res.data.liked);
      } catch (err) {
        console.error("❌ 게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  
  // 컴포넌트 마운트 시 최상단으로 이동 + 이미지 페이드 인 효과
  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(true);
  }, []);

  // 좋아요 버튼 클릭 시 애니메이션 효과 추가
      const toggleLike = async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/likes/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("✅ 좋아요 토글 완료", res.data);
      
          setLiked(prev => !prev);
          setAnimate(true);
          setTimeout(() => setAnimate(false), 300);
        } catch (err) {
          console.error("❌ 좋아요 요청 실패", err);
        }
      };



  // 댓글
  useEffect(() => {
    if (!id) return;
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error("댓글 조회 실패", err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUser(res.data))
      .catch(err => console.error("사용자 정보 조회 실패", err));
    }
  }, []);


  // 댓글
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;
  
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${id}`, {
        content: newComment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${id}`);
      setComments(res.data);
      setNewComment("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (id, content) => {
    setEditingId(id);
    setEditedContent(content);
  };

  //댓글 삭제
  const handleCommentDelete = async (commentId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // 삭제된 댓글을 제외한 목록으로 갱신
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error("댓글 삭제 실패", err);
    }
  };

  //댓글 수정
  const handleEditConfirm = async (commentId) => {
    if (!editedContent.trim()) return;
  
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`, {
        content: editedContent,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // 수정 완료되면 comment 목록도 갱신
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: editedContent } : c
        )
      );
      setEditingId(null);
      setEditedContent("");
    } catch (err) {
      console.error("댓글 수정 실패", err);
    }
  };

  

  if (loading) {
    return <Box sx={{ padding: "40px", textAlign: "center" }}><Typography>로딩 중...</Typography></Box>;
  }
  
  if (!product) {
    return <Box sx={{ padding: "40px", textAlign: "center" }}><Typography>게시글이 없습니다.</Typography></Box>;
  }



  return (
    <Box sx={{ padding: "40px", maxWidth: "1200px", margin: "auto", display: "flex", gap: "20px" }}>
      {/* 왼쪽: 이미지 + 뒤로가기 버튼 */}
      <Box
        sx={{
          position: "relative",
          flex: 1,
          maxWidth: "600px",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <IconButton sx={{ position: "absolute", top: 10, left: 10, bgcolor: "white" }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: "8px" }}>
          {/* ✅ 클릭 시 모달 오픈 */}
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ width: "100%", height: "auto", objectFit: "cover", cursor: "pointer" }}
            onClick={() => setOpenModal(true)}
          />
        </Paper>
      </Box>

      {/* 오른쪽: 게시글 정보 */}
      <Box sx={{ flex: 1 }}>
        {/* 🔹 좋아요 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <IconButton
          onClick={toggleLike}
          sx={{
            width: 48,
            height: 48,
            transition: "transform 0.3s ease-in-out, opacity 0.2s ease-in-out",
            transform: animate ? "scale(1.4)" : "scale(1)",
            opacity: animate ? 0.8 : 1,
          }}
        >
          {/* ✅ 조건 분기 로딩 끝났을 때만 렌더링하게끔 */}
          {!loading && (
            <img
              key={liked ? "liked" : "not-liked"} // 💡 렌더링 강제
              src={liked ? "/images/like_filled.png" : "/images/like.png"}
              alt="Like"
              width="40px"
              height="40px"
            />
          )}
    </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>

        {/* 제목 + 작성자 */}
        <Typography variant="h4" fontWeight="bold">
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
        <Avatar
          src={
            product?.profileImg
              ? `${product.profileImg}?v=${Date.now()}`
              : "/images/user.png"
          }
          alt={product?.nickname}
          sx={{ width: 40, height: 40 }}
        />
          <Box>
            <Typography variant="h6">{product.nickname} 님</Typography>
            {/* 필요하다면 작성 날짜도 여기에 표시할 수 있어 */}
            <Typography variant="body2" color="gray">
              {new Date(product.createdAt).toLocaleDateString("ko-KR")}
            </Typography>
          </Box>
        </Box>

        {/* 설명 */}
        <Typography variant="body1" sx={{ mt: 3 }}>
          {product.caption}
        </Typography>

        {/* 댓글 입력창 */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            어떠셨나요?
          </Typography>

          <TextField
            fullWidth
            placeholder="댓글을 추가하고 대화를 시작하세요."
            variant="outlined"
            sx={{ mt: 2 }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCommentSubmit();
              }
            }}
          />

          {/* 댓글 목록 출력 */}
          <Box sx={{ mt: 3 }}>
            {comments.length === 0 ? (
              <Typography color="text.secondary">댓글이 아직 없어요.</Typography>
            ) : (
              comments.map((comment) => (
                <Box
                key={comment.id || `${comment.nickname}-${Math.random()}`}
                sx={{ mb: 2, p: 1.5, border: "1px solid #eee", borderRadius: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.nickname} 님
                  </Typography>

                  {editingId === comment.id ? (
                    <>
                      <TextField
                        fullWidth
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleEditConfirm(comment.id)}
                        >
                          저장
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setEditingId(null)}
                        >
                          취소
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {comment.content}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        {new Date(comment.createdAt).toLocaleString("ko-KR")}
                      </Typography>

                      
                      {(user?.id === comment.userId || user?.id === product.userId) && (
                        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                          {/* ✅ 댓글 작성자만 수정 가능 */}
                          {user?.id === comment.userId && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleEditClick(comment.id, comment.content)}
                            >
                              수정
                            </Button>
                          )}
                           {(user?.id === comment.userId || user?.id === product.userId) && (
                          <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleCommentDelete(comment.id)}
                        >
                          삭제
                        </Button>
                           )}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* ✅ 이미지 클릭 시 원본 보기 모달 */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="lg">
          <Box
            sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: "100%", height: "auto", maxWidth: "900px" }}
            />
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ProductDetail;