import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  useEffect(() => {
    if (authTokens) {
      const decoded = jwtDecode(authTokens.access);
      console.log("Decoded token:", decoded);
      setUser(decoded);
    }
  }, [authTokens]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });
      console.log("Login response:", response.data);
      setAuthTokens(response.data);
      const decoded = jwtDecode(response.data.access);
      setUser(decoded);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
