import requests
import speech_recognition as sr
import numpy as np
import matplotlib.pyplot as plt
import cv2
from easygui import *
import os
from PIL import Image, ImageTk
from itertools import count
import tkinter as tk
import string

# Function to translate text to Gujarati using Microsoft Translator API
def translate_text(text, target_language="gu"):
    url = "https://microsoft-translator-text.p.rapidapi.com/translate"
    querystring = {"api-version":"3.0","to":target_language}
    payload = [{"Text": text}]
    headers = {
        "x-rapidapi-key": "4aba494ffdmshd92178fbf7bd38ap1d2bdcjsna84394b46eab",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers, params=querystring)
    translation = response.json()
    return translation[0]['translations'][0]['text'] if 'translations' in translation[0] else text

# Function to handle speech recognition and display text
def func():
    r = sr.Recognizer()
    isl_gif = [...]  # Your list of ISL GIFs
    
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source)
        i = 0
        while True:
            print("I am Listening")
            audio = r.listen(source)
            try:
                # Recognize speech using Google
                a = r.recognize_google(audio)
                a = a.lower()
                print('You Said: ' + a)

                # Translate the recognized text to Gujarati
                gujarati_translation = translate_text(a)

                # Print both English and Gujarati translations
                print(f'You Said (Gujarati): {gujarati_translation}')

                # Process the text as per your existing code
                if a.lower() in ['goodbye', 'good bye', 'bye']:
                    print("Oops! Time to say goodbye")
                    break

                elif a.lower() in isl_gif:
                    class ImageLabel(tk.Label):
                        """a label that displays images, and plays them if they are gifs"""
                        def load(self, im):
                            if isinstance(im, str):
                                im = Image.open(im)
                            self.loc = 0
                            self.frames = []

                            try:
                                for i in count(1):
                                    self.frames.append(ImageTk.PhotoImage(im.copy()))
                                    im.seek(i)
                            except EOFError:
                                pass

                            try:
                                self.delay = im.info['duration']
                            except:
                                self.delay = 100

                            if len(self.frames) == 1:
                                self.config(image=self.frames[0])
                            else:
                                self.next_frame()

                        def unload(self):
                            self.config(image=None)
                            self.frames = None

                        def next_frame(self):
                            if self.frames:
                                self.loc += 1
                                self.loc %= len(self.frames)
                                self.config(image=self.frames[self.loc])
                                self.after(self.delay, self.next_frame)

                    root = tk.Tk()
                    lbl = ImageLabel(root)
                    lbl.pack()
                    lbl.load(r'ISL_Gifs/{0}.gif'.format(a.lower()))
                    root.mainloop()
                else:
                    for i in range(len(a)):
                        if a[i] in arr:
                            ImageAddress = 'letters/' + a[i] + '.jpg'
                            ImageItself = Image.open(ImageAddress)
                            ImageNumpyFormat = np.asarray(ImageItself)
                            plt.imshow(ImageNumpyFormat)
                            plt.draw()
                            plt.pause(0.8)
                        else:
                            continue

            except Exception as e:
                print("Error: ", str(e))
            plt.close()

# Main loop to start the application
while True:
    image = "signlang.png"
    msg = "HEARING IMPAIRMENT ASSISTANT"
    choices = ["Live Voice", "All Done!"]
    reply = buttonbox(msg, image=image, choices=choices)
    if reply == choices[0]:
        func()
    if reply == choices[1]:
        quit()
