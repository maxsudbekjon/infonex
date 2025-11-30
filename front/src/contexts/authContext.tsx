import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import  api  from "../api/api";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auto-refresh access token
  useEffect(() => {
    const interval = setInterval(async () => {
      const refresh = authService.getRefresh();
      if (!refresh) return;

      try {
        const { data } = await api.post("/token/refresh/", { refresh });
        authService.saveTokens(data.access, refresh);
        console.log("Token refreshed");
      } catch {
        logout();
      }
    }, 4 * 60 * 1000); // every 4 minutes

    return () => clearInterval(interval);
  }, []);

  
  
  // Check saved token on load
  useEffect(() => {
    const access = authService.getAccess();
    setIsAuthenticated(!!access);
    setLoading(false);
  }, []);

  // Auto refresh tokens
  useEffect(() => {
    const interval = setInterval(async () => {
      const refresh = authService.getRefresh();
      if (!refresh) return;

      try {
        const { data } = await api.post("/token/refresh/", { refresh });
        authService.saveTokens(data.access, refresh);
        console.log("Token refreshed");
      } catch (err) {
        logout();
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = async (username: string, password: string) => {
    const { data } = await api.post("/token/", { username, password });

    authService.saveTokens(data.access, data.refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
