import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout"; // 공통 레이아웃
import MainPage from "./component/main"; // 메인 페이지
import MainSlider from "./component/main/MainSlider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* MainLayout을 기본 레이아웃으로 설정 */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}


export default App;
