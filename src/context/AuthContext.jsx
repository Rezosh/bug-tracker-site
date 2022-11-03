import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const expiresAt = localStorage.getItem("expiresAt");
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem("expiresAt", expiresAt);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setAuthState({
      token,
      expiresAt,
      userInfo,
    });
  };

  const isAuthenticated = () => {
    if (!authState.expiresAt) return false;
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    if (!authState.userInfo) return false;
    return authState.userInfo.role === "admin";
  };

  const logout = async () => {
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("userInfo");
    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {},
    });
    await fetch("/api/auth/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/login");
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        logout,
      }}>
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
