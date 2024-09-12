// StoT.js
import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const StoT = () => {
  const [messages, setMessages] = useState([]);
  const [translations, setTranslations] = useState([]);
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

          // Call translation API for each final transcript
          translateToGujarati(transcript);
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

  // Translation function using Microsoft Translator API
  const translateToGujarati = async (text) => {
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'api-version': '3.0',
        to: 'gu', // Gujarati language code
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'x-rapidapi-key': '4aba494ffdmshd92178fbf7bd38ap1d2bdcjsna84394b46eab',
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: [
        {
          Text: text
        }
      ]
    };

    try {
      const response = await axios.request(options);
      const translatedText = response.data[0].translations[0].text;
      setTranslations((prevTranslations) => [...prevTranslations, translatedText]);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
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
          {/* Display original message */}
          <strong>English:</strong> {message}
          <br />
          {/* Display translated message */}
          <strong>Gujarati:</strong> {translations[index] || "Translating..."}
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
  );
};

export default StoT;
