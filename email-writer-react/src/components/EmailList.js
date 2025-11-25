import React from "react";

export default function EmailList({ emails }) {
  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "25px" }}>
      
      {emails.map((email, i) => (
        <div
          key={i}
          style={{
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "white",
          }}
        >
          
          <h3 style={{ marginBottom: "8px" }}>{email.subject}</h3>

          {/* From field — works again */}
          <small style={{ display: "block", marginBottom: "10px", color: "#444" }}>
            <b>From:</b> {email.from || "Unknown"}
          </small>

          {/* Longer snippet preview */}
          <p style={{ color: "#555", whiteSpace: "pre-wrap" }}>
            {email.snippet?.length > 300
              ? email.snippet.substring(0, 300) + "..."
              : email.snippet}
          </p>

          {/* Priority label */}
          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                fontWeight: "bold",
                background:
                  email.label === "HIGH"
                    ? "#ffb3b3"
                    : email.label === "MEDIUM"
                    ? "#ffe9b3"
                    : "#c8ffc8",
              }}
            >
              {email.label}
            </span>
          </div>
        </div>
      ))}
    
    </div>
  );
}
