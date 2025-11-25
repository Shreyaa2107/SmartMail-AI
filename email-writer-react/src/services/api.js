const API_BASE = "http://localhost:8080/api/gmail";

export const getGoogleLoginUrl = async () => {
  const response = await fetch(`${API_BASE}/login`);
  return response.text();
};

// export const exchangeCodeForToken = async (code) => {
//   const response = await fetch(`${API_BASE}/callback?code=${code}`, {
//     method: "POST"
//   });
//   return response.json();
// };

export const fetchEmails = async (accessToken) => {
  const response = await fetch(`${API_BASE}/fetch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: accessToken
  });
  return response.json();
};

export const prioritizeEmails = async (emails) => {
  const response = await fetch(`${API_BASE}/prioritize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emails)
  });
  return response.json();
};
