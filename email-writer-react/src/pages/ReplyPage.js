import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function ReplyPage() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------
  // Generate Reply Function
  // -----------------------
  const handleGenerateReply = async () => {
    if (!emailContent.trim()) return;

    setLoading(true);
    setGeneratedReply("");

    try {
      const res = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent, tone }),
      });

      const text = await res.text();
      setGeneratedReply(text);
    } catch (err) {
      setGeneratedReply("❌ Failed to generate reply. Check backend.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background:"linear-gradient(135deg, #001f54, #4e77a6, #4e77a6, #001f54)",
          paddingTop: "120px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Generate Reply
        </h2>

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
          {/* Textarea Input */}
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

          {/* Tone Selector */}
          <div style={{ marginTop: "15px" }}>
            Tone:{" "}
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ padding: "6px 10px", borderRadius: "6px" }}
            >
              <option value="">None</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReply}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "10px 22px",
              background: "#001f54",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Generating..." : "Generate Reply"}
          </button>

          {/* Output */}
          {generatedReply && (
            <div style={{ marginTop: "20px" }}>
              <h3>Your Generated Reply:</h3>
              <textarea
                value={generatedReply}
                readOnly
                style={{
                  width: "100%",
                  minHeight: "150px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={() => navigator.clipboard.writeText(generatedReply)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: "transparent",

                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Copy Reply
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
