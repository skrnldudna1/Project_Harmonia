import React from "react";
import "../../App.css";

const MainVideo: React.FC = () => {
  return (
    <div id="video-container">
      {/* 로컬 비디오 파일 불러오기 */}
      <video autoPlay loop muted playsInline id="background-video">
        <source src="/videos/Loving_You.mp4" type="video/mp4" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>
    </div>
  );
};

export default MainVideo;
