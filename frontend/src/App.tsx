import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout"; // 공통 레이아웃
import MainPage from "./component/main"; // 메인 페이지
import MyPage from "./component/pages/MyPage";
import ProductDetail from "./component/pages/ProductDetail";
import Login from "./component/Login";
import Join from "./component/Join";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* MainLayout을 기본 레이아웃으로 설정 */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="user" element={<MyPage />} /> {/* 마이페이지 */}
            <Route path="/product/:id" element={<ProductDetail />} /> {/* 상세 페이지 추가 */}
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    
  );
}


export default App;
