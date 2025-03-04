import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  "/images/slider/A1.jpg",
  "/images/slider/slider0.gif",
  "/images/slider/slider2.jpg",
];

// 🔹 커스텀 화살표 버튼 컴포넌트
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "black",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
      zIndex: 2,
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "black",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
      zIndex: 2,
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const MainSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />, // 🔹 커스텀 이전 버튼
    nextArrow: <NextArrow />, // 🔹 커스텀 다음 버튼
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "960px",
        marginTop: "0px !important",
        padding: "0px !important",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`slide-${index}`}
            sx={{
              width: "100%",
              height: "960px",
              objectFit: "cover",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default MainSlider;
