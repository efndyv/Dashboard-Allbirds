import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  const register = async (fullname, email, password, confirmPassword) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        fullname,
        email,
        password,
        confirmPassword,
      });

      console.log("Register successful, now login");
      return true;
    } catch (error) {
      console.error("register error:", error.response?.data || error.message);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      setToken(response.data.token);
      console.log("Login successful, token stored");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ login, logout, register, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
