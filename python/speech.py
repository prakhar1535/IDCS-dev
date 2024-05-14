import speech_recognition as sr

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
        print("Sorry, could not understand audio.")
    except sr.RequestError as e:
        print(f"Could not request results; {e}")

# Continuous speech to text
if __name__ == "__main__":
    while True:
        text = speech_to_text()
        if text:
            print("You said:", text)
       # input("Press Enter to continue, or Ctrl+C to exit...")