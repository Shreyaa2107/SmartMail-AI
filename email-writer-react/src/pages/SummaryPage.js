import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function SummaryPage() {
  const [emailContent, setEmailContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSummary = async () => {
    if (!emailContent) return;

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("http://localhost:8080/api/email/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent }),
      });

      if (!res.ok) throw new Error("Request failed");
      const text = await res.text();
      setSummary(text);
    } catch (e) {
      setError("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* identical background + spacing as ReplyPage */}
      <div
        style={{
          minHeight: "100vh",
          background: "transparent",

          paddingTop: "100px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Summarize Email
        </h2>

        {/* identical centered card */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <textarea
            placeholder="Paste the email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "140px",
              padding: "10px,10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          <button
            onClick={handleGenerateSummary}
            disabled={loading || !emailContent}
            style={{
              marginTop: "20px",
              padding: "10px 22px",
              background: "#001f54",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}

          {summary && (
            <div style={{ marginTop: "24px" }}>
              <h3>Summary:</h3>
              <textarea
                style={{
                  width: "100%",
                  minHeight: "140px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                value={summary}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
