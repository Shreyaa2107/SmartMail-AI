import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        boxSizing: "border-box",
        zIndex: 2000,             // VERY IMPORTANT
      }}
    >
      <h1 style={{ margin: 0, fontSize: "26px" }}>SmartMail</h1>

      <button
  onClick={() => navigate("/")}
  style={{
    padding: "8px 16px",
    background: "#001f54",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Back to Menu
</button>
    </div>
  );
}
