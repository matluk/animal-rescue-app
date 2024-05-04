import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "unknown"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("email") || "unknown"
  );

  const initialToken = localStorage.getItem("token") || "";

  const [token, setToken] = useState(initialToken);

  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);

  const login = async (token, role, username, email) => {
    try {
      localStorage.setItem("token", token);
      if (role === "admin") {
        localStorage.setItem("admin", true);
        setIsAdmin(true);
      }
      if (token) {
        setUsername(username);
        localStorage.setItem("username", username);
        setEmail(email);
        localStorage.setItem("email", email);
      }
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("admin");
    localStorage.removeItem("email");
    setIsAdmin(false);
    setUsername("unknown");
    setToken("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isAdmin,
        token,
        username,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
