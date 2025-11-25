import React, { useEffect, useState } from "react";
import { fetchEmails, prioritizeEmails } from "../services/api";
import EmailList from "../components/EmailList";
import Navbar from "../components/Navbar";


export default function Dashboard({ accessToken }) {
const [emails, setEmails] = useState([]);
const [loading, setLoading] = useState(false);


const loadEmails = async () => {
setLoading(true);
const fetched = await fetchEmails(accessToken);
const priorityResult = await prioritizeEmails(fetched);


const merged = fetched.map((email, index) => ({
...email,
label: priorityResult[index].label,
}));


const order = { HIGH: 1, MEDIUM: 2, LOW: 3 };
merged.sort((a, b) => order[a.label] - order[b.label]);
setEmails(merged);
setLoading(false);
};


useEffect(() => {
loadEmails();
}, []);


if (loading)
return <h3 style={{ textAlign: "center", marginTop: "40px" }}>Loading emails...</h3>;


return (
  <>
    <Navbar />
<div
  style={{
    paddingTop: "110px",   // ← IMPORTANT
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "30px",
    maxWidth: "900px",
    margin: "0 auto",
  }}
>
<h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Emails (Prioritized)</h2>
<EmailList emails={emails} />
</div>
</>
);
}