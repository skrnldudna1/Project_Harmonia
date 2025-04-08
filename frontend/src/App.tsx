import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Join from "./component/Join";
import Login from "./component/Login";
import MainPage from "./component/main";
import MyPage from "./component/pages/MyPage";
import Header from "./layouts/Header";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider, useAuth } from "./component/AuthProvider";
import CreationsTab from "./component/pages/Tab/CreationsTab";
import ProductDetail from "./component/pages/ProductDetail";
import PostCreate from "./component/pages/post/PostCreate";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function MainRouter() {
  const { user, loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/user" element={user ? <MyPage user={user} /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/post/create" element={<PostCreate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
