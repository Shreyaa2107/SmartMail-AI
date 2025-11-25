import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import ReplyPage from "./pages/ReplyPage";
import SummaryPage from "./pages/SummaryPage";
import Dashboard from "./pages/Dashboard"; // your prioritized inbox

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
      // clean the URL (remove ?access_token=...)
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // 1️⃣ Before login: show only Login page
  if (!accessToken) {
    return <Login />;
  }

  // 2️⃣ After login: show router with 3 options
  return (
    <BrowserRouter>
      <Routes>
        {/* Home menu with 3 buttons */}
        <Route path="/" element={<Home />} />

        {/* Generate Reply page */}
        <Route path="/reply" element={<ReplyPage />} />

        {/* Summarize Email page */}
        <Route path="/summary" element={<SummaryPage />} />

        {/* Prioritized Inbox (existing Dashboard) */}
        <Route path="/inbox" element={<Dashboard accessToken={accessToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
