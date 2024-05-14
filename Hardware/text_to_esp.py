import asyncio
import websockets
import speech_recognition as sr

# Initialize the recognizer
recognizer = sr.Recognizer()

# Function to convert speech to text and send it via WebSocket
async def send_data_to_esp(text):
    uri = "ws://192.168.114.62/ws"  # Replace <ESP32_IP_ADDRESS> with the IP address of your ESP32
    async with websockets.connect(uri) as websocket:
        await websocket.send(text)
        print("Message sent to ESP32:", text)

# Function to continuously listen for speech input and process certain keywords
async def listen_and_process():
    with sr.Microphone() as source:
        print("Listening...")
        while True:
            audio = recognizer.listen(source)

            try:
                text = recognizer.recognize_google(audio)
                print("You said:", text)
                # Check if the recognized text contains any of the specified keywords
                keywords = ["hello", "help", "sorry", "excuse me", "i love you", "sir", "madam"]
                for keyword in keywords:
                    if keyword in text.lower():
                        await send_data_to_esp(keyword)  # Send the keyword to ESP32
            except sr.UnknownValueError:
                print("Sorry, could not understand audio.")
            except sr.RequestError as e:
                print(f"Could not request results; {e}")

# Main function to run the asyncio tasks
async def main():
    await asyncio.gather(listen_and_process())

# Run the main asyncio event loop
asyncio.run(main())
