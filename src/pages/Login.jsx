import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../route/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      alert("Geçersiz email veya şifre!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          padding: "3rem",
          width: "100%",
          maxWidth: "450px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(52, 152, 219, 0.1)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(46, 204, 113, 0.1)",
          }}
        ></div>

        <h1
          style={{
            color: "#2c3e50",
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Giriş Yap
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "86%",
                padding: "1rem",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "all 0.3s",
                paddingLeft: "3rem",
                background: "transparent",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3498db";
                e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#7f8c8d",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "86%",
                padding: "1rem",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "all 0.3s",
                paddingLeft: "3rem",
                background: "transparent",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3498db";
                e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#7f8c8d",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <button
            type="submit"
            style={{
              padding: "1rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 4px 6px rgba(52, 152, 219, 0.3)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2980b9";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 8px rgba(52, 152, 219, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#3498db";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(52, 152, 219, 0.3)";
            }}
          >
            Giriş Yap
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#7f8c8d",
            fontSize: "0.9rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Hesabınız yok mu?{" "}
          <a
            href="/register"
            style={{
              color: "#3498db",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Kayıt Olun
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
