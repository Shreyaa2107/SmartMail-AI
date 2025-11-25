// Gmail AI Tools: AI Reply, Show Priority, Summarize Email

console.log("Email Writer Extension - Content Script Loader");

// ✅ Create AI Reply button
function createAIButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI reply");
  return button;
}

// ✅ Create Show Priority button
function createPriorityButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "Show Priority";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Detect email priority");
  return button;
}

// ✅ Create Summarize button
function createSummarizeButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "Summarize";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Summarize email content");
  return button;
}

// ✅ Extract email content
function getEmailContent() {
  const selectors = [".h7", ".a3s.aiL", "gmail_quote", '[role="presentation"]'];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) return content.innerText.trim();
  }
  return "";
}

// ✅ Locate Gmail toolbar
function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', "gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) return toolbar;
  }
  return null;
}

// ✅ Inject buttons
function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) existingButton.remove();

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }

  console.log("Toolbar found, creating buttons");

  const aiButton = createAIButton();
  const priorityButton = createPriorityButton();
  const summarizeButton = createSummarizeButton();

  aiButton.classList.add("ai-reply-button");
  priorityButton.classList.add("priority-button");
  summarizeButton.classList.add("summarize-button");

  // ---------- AI Reply logic ----------
  aiButton.addEventListener("click", async () => {
    try {
      aiButton.innerHTML = "Generating...";
      aiButton.disabled = true;

      const emailContent = getEmailContent();

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const generatedReply = await response.text();
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );

      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedReply);
      } else {
        console.error("Compose box not found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate reply");
    } finally {
      aiButton.innerHTML = "AI Reply";
      aiButton.disabled = false;
    }
  });

  // ---------- Show Priority logic ----------
  priorityButton.addEventListener("click", async () => {
    try {
      priorityButton.innerHTML = "Checking...";
      priorityButton.disabled = true;

      const emailContent = getEmailContent();
      const subject = document.title || "Email Subject";
      const snippet = emailContent.split(" ").slice(0, 20).join(" ");

      const response = await fetch("http://localhost:8080/api/email/priority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject,
          snippet: snippet,
          from: "unknown@gmail.com",
        }),
      });

      if (!response.ok) throw new Error("Priority API request failed");

      const data = await response.json();
      alert("📧 Email Priority: " + data.label.toUpperCase());
    } catch (error) {
      console.error(error);
      alert("Failed to get priority");
    } finally {
      priorityButton.innerHTML = "Show Priority";
      priorityButton.disabled = false;
    }
  });

  // ---------- Summarize Email logic ----------
  summarizeButton.addEventListener("click", async () => {
    try {
      summarizeButton.innerHTML = "Summarizing...";
      summarizeButton.disabled = true;

      const emailContent = getEmailContent();
      if (!emailContent) {
        alert("No email content found to summarize!");
        return;
      }

      const response = await fetch("http://localhost:8080/api/email/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailContent }),
      });

      if (!response.ok) throw new Error("Summarization API failed");

      const summary = await response.text();

      // Floating popup for summary
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.bottom = "20px";
      popup.style.right = "20px";
      popup.style.background = "#fff";
      popup.style.color = "#000";
      popup.style.border = "1px solid #ccc";
      popup.style.borderRadius = "10px";
      popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)";
      popup.style.padding = "12px";
      popup.style.zIndex = "99999";
      popup.style.maxWidth = "400px";
      popup.style.fontSize = "14px";
      popup.style.lineHeight = "1.4";
      popup.innerHTML = `<b>📋 Email Summary:</b><br>${summary}`;

      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 10000);
    } catch (error) {
      console.error(error);
      alert("Failed to summarize email");
    } finally {
      summarizeButton.innerHTML = "Summarize";
      summarizeButton.disabled = false;
    }
  });

  // ✅ Add buttons to Gmail toolbar
  toolbar.insertBefore(summarizeButton, toolbar.firstChild);
  toolbar.insertBefore(priorityButton, toolbar.firstChild);
  toolbar.insertBefore(aiButton, toolbar.firstChild);
}

// ✅ Watch for Gmail UI changes
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches(".aDh,.btC,[role='dialog']") ||
          node.querySelector(".aDh,.btC,[role='dialog']"))
    );

    if (hasComposeElements) {
      console.log("Compose Window Detected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
