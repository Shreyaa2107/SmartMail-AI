import React from "react";
import { getGoogleLoginUrl } from "../services/api";

export default function Login() {
  const handleLogin = async () => {
    const url = await getGoogleLoginUrl();
    window.location.href = url;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
          background: "linear-gradient(135deg, #001f54, #4e77a6, #4e77a6, #001f54)",
        // background: "linear-gradient(135deg, #8e9dfa, #a866f7, #bf5af2)",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "32px 40px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "360px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>SmartMail Dashboard</h1>
        <p style={{ marginBottom: "24px", color: "#555" }}>
          Sign in with Google to use AI tools and view your prioritized inbox.
        </p>

        <button
          onClick={handleLogin}
          style={{
            padding: "12px 26px",
            fontSize: "16px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: "#003f87",
            color: "white",
            fontWeight: 600,
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
