// 📂 layouts/Header.tsx
const Header = () => {
    return (
      <header className="header">
        {/* 상단 바 (보라색) */}
        <div className="top-bar">
          <div className="top-bar-content">
            <span>our love, our hope!</span>
            <span>NEW SIGNUP 3,000 POINT</span>
          </div>
        </div>
  
        {/* 메인 헤더 영역 */}
        <div className="main-header">
          <img className="logo" src="https://placehold.co/84x48" alt="Logo" />
          <div className="icons">
            <div className="icon-placeholder"></div>
            <div className="icon-placeholder"></div>
            <div className="icon-placeholder"></div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  