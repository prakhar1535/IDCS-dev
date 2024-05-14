# server.py
from flask import Flask, request, jsonify
import speech_recognition as sr

app = Flask(__name__)

# Initialize the recognizer
recognizer = sr.Recognizer()

# Function to convert speech to text
def speech_to_text():
    with sr.Microphone() as source:
        print("Speak something...")
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return None
    except sr.RequestError as e:
        return f"Could not request results; {e}"

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text_endpoint():
    text = speech_to_text()
    if text:
        return jsonify({'text': text})
    else:
        return jsonify({'error': 'Could not understand audio.'})

if __name__ == '__main__':
    app.run(debug=True)
