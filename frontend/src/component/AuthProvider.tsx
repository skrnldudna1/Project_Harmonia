import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
  })
        .then((res) => setUser(res.data))
        .catch((error) => {
          console.error("인증 실패:", error);
          setUser(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
