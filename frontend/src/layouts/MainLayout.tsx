import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
    <div style={{ paddingTop: "80px" }}> 
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <div style={{ paddingTop: "80px" }}> 
        </div>
      <Footer />
      </div>
    </>
  );
};

export default MainLayout;
