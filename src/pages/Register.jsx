import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ad soyad gereklidir";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email gereklidir";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir email adresi girin";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Burada kayıt işlemini gerçekleştirin
      // Örneğin API çağrısı yapabilirsiniz
      console.log("Kayıt başarılı:", formData);
      navigate("/login"); // Kayıt başarılıysa login sayfasına yönlendir
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
            background: "rgba(155, 89, 182, 0.1)",
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
            background: "rgba(241, 196, 15, 0.1)",
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
          Kayıt Ol
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
              type="text"
              name="name"
              placeholder="Ad Soyad"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "86%",
                padding: "1rem",
                border: `1px solid ${errors.name ? "#e74c3c" : "#e0e0e0"}`,
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
                e.target.style.borderColor = errors.name
                  ? "#e74c3c"
                  : "#e0e0e0";
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
                color: errors.name ? "#e74c3c" : "#7f8c8d",
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {errors.name && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "86%",
                padding: "1rem",
                border: `1px solid ${errors.email ? "#e74c3c" : "#e0e0e0"}`,
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
                e.target.style.borderColor = errors.email
                  ? "#e74c3c"
                  : "#e0e0e0";
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
                color: errors.email ? "#e74c3c" : "#7f8c8d",
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
            {errors.email && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "86%",
                padding: "1rem",
                border: `1px solid ${errors.password ? "#e74c3c" : "#e0e0e0"}`,
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
                e.target.style.borderColor = errors.password
                  ? "#e74c3c"
                  : "#e0e0e0";
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
                color: errors.password ? "#e74c3c" : "#7f8c8d",
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
            {errors.password && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                {errors.password}
              </p>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Şifre Tekrar"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "86%",
                padding: "1rem",
                border: `1px solid ${
                  errors.confirmPassword ? "#e74c3c" : "#e0e0e0"
                }`,
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
                e.target.style.borderColor = errors.confirmPassword
                  ? "#e74c3c"
                  : "#e0e0e0";
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
                color: errors.confirmPassword ? "#e74c3c" : "#7f8c8d",
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {errors.confirmPassword && (
              <p
                style={{
                  color: "#e74c3c",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              padding: "1rem",
              backgroundColor: "#9b59b6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 4px 6px rgba(155, 89, 182, 0.3)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginTop: "1rem",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#8e44ad";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 8px rgba(155, 89, 182, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#9b59b6";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(155, 89, 182, 0.3)";
            }}
          >
            Kayıt Ol
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
          Zaten hesabınız var mı?{" "}
          <a
            href="/login"
            style={{
              color: "#3498db",
              textDecoration: "none",
              fontWeight: "600",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Giriş Yapın
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
