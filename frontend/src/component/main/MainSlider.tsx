import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const images = [
  "/images/slider/A1.jpg",
  "/images/slider/slider0.gif",
  "/images/slider/slider2.jpg",
];

const MainSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // 좌우 화살표 제거
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "960px",
        marginTop: "0px !important", // 갤러리 아래에 딱 붙도록 여백 제거
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
