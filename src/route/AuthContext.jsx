import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (name, surname, email, password) => {};
  const login = (email, password) => {
    // Basit bir kontrol (Örnek: admin@example.com / admin123)
    // if (email === "admin@example.com" && password === "admin123") {
    setUser({ email, role: "admin" });
    return true;
    // }
    // return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
