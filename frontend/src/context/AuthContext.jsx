import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const safeParse = (key) => {
      const value = localStorage.getItem(key);
      if (!value || value === "undefined") return null;

      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    };

    const storedUser = safeParse("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUser(storedUser);
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (userData, userRole) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    setUser(userData);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;