import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/api/auth/me");

      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password
      }
    );

    setUser(response.data.data);

    return response.data;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    const response = await api.post(
      "/api/auth/register",
      {
        name,
        email,
        password
      }
    );

    return response.data;
  };

  const logout = async () => {
    await api.post("/api/auth/logout");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        getCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};