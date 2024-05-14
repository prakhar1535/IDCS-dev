import sounddevice as sd
import numpy as np

def detect_noise(duration=1):
    # Record audio
    fs = 44100  # Sample rate
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype=np.float32)
    sd.wait()  # Wait for recording to finish
    
    # Calculate noise level
    rms = np.sqrt(np.mean(recording**2))
    db = 20 * np.log10(rms)
    
    return db

if __name__ == "__main__":
    try:
        while True:
            noise_level = detect_noise()
            print(f"Noise Level: {noise_level:.2f} dB")
            
            if noise_level > 50:
                print("It's noise.")
            else:
                print("It's normal voice.")
                
    except KeyboardInterrupt:
        print("Program ended by user.")
