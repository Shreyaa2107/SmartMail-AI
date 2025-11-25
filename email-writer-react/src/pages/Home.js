import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",

        paddingTop: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>Welcome to SmartMail</h2>
        <p style={{ opacity: 0.7, marginBottom: "20px" }}>
          Choose what you want to do:
        </p>

        <button
          onClick={() => navigate("/reply")}
          style={buttonStyle}
        >
          Generate Reply
        </button>

        <button
          onClick={() => navigate("/summary")}
          style={buttonStyle}
        >
          Summarize Email
        </button>

        <button
          onClick={() => navigate("/inbox")}
          style={buttonStyle}
        >
          View Prioritized Inbox
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  background:"#003f87",
    color: "white",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
};
