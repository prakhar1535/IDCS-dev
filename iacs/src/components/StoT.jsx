// StoT.js
import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const StoT = () => {
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition();

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript;
          setMessages((prevMessages) => [...prevMessages, transcript]);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleRecognition = () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
        sx={{
          backgroundColor: "#F9F9F9",
          borderRadius: "20px",
          padding: "10px",
          height: "auto",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "20px",
              marginBottom: "10px",
            }}
          >
            {message}
          </Box>
        ))}
        <Button
          disableFocusRipple
          variant="contained"
          sx={{
            borderRadius: "20px",
            textDecoration: "none",
            backgroundColor: listening ? "red" : "green",
          }}
          onClick={toggleRecognition}
        >
          {listening ? "Listening..." : "Start Listening"}
        </Button>
      </Box>
    </>
  );
};

export default StoT;
