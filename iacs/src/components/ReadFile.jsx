import React, { useState } from "react";

const ReadFile = () => {
  const [text, setText] = useState("");

  const readAloud = () => {
    if ("speechSynthesis" in window) {
      const lines = text.split("\n");
      lines.forEach((line, index) => {
        const utterance = new SpeechSynthesisUtterance(line);
        // Customize the speech (optional)
        // utterance.voice = speechSynthesis.getVoices()[0]; // Example: set the voice
        // utterance.rate = 1; // Speed of speech
        // utterance.pitch = 1; // Pitch of the voice
        // Delay between lines
        setTimeout(() => {
          speechSynthesis.speak(utterance);
        }, index * 2000); // 2 seconds delay between lines
      });
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        style={{ width: "100%", height: "200px" }}
      />
      <button onClick={readAloud} style={{ marginTop: "10px" }}>
        Read Aloud
      </button>
    </div>
  );
};

export default ReadFile;
