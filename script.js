// script.js
const apiKey = "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";

const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e){
  if(e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addMessage("Kisete réfléchit...", "ai");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;

  // Remplacer le message "réflexion" par la vraie réponse
  const lastAiMsg = chatbox.querySelector(".ai:last-child");
  lastAiMsg.textContent = aiMessage;
  chatbox.scrollTop = chatbox.scrollHeight;
}

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = text;
  msgDiv.classList.add("message", sender);
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}
