from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import cv2
import mediapipe as mp
import time
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, resources={r"/*": {"origins": "*"}})


# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False,
                       max_num_hands=1,
                       min_detection_confidence=0.7,
                       min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Variables for gestures
gesture_start_time = None
prev_x, prev_y = 0, 0

def get_finger_tips(landmarks):
    finger_tips = [
        landmarks[mp_hands.HandLandmark.THUMB_TIP],
        landmarks[mp_hands.HandLandmark.INDEX_FINGER_TIP],
        landmarks[mp_hands.HandLandmark.MIDDLE_FINGER_TIP],
        landmarks[mp_hands.HandLandmark.RING_FINGER_TIP],
        landmarks[mp_hands.HandLandmark.PINKY_TIP]
    ]
    return finger_tips

def get_finger_dips(landmarks):
    finger_dips = [
        landmarks[mp_hands.HandLandmark.THUMB_IP],
        landmarks[mp_hands.HandLandmark.INDEX_FINGER_DIP],
        landmarks[mp_hands.HandLandmark.MIDDLE_FINGER_DIP],
        landmarks[mp_hands.HandLandmark.RING_FINGER_DIP],
        landmarks[mp_hands.HandLandmark.PINKY_DIP]
    ]
    return finger_dips

def are_fingers_up(tips, dips):
    return [tips[i].y < dips[i].y for i in range(len(tips))]

@socketio.on('connect')
def connect():
    print('Client connected')

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')

@socketio.on('message')
def message(data):
    print('received message: ' + data)
    emit('response', {'data': 'Message received'})

def detect_gesture():
    global gesture_start_time, prev_x, prev_y
    success, img = cap.read()
    if not success:
        return

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            finger_tips = get_finger_tips(hand_landmarks.landmark)
            finger_dips = get_finger_dips(hand_landmarks.landmark)

            # Determine which fingers are up
            fingers_up = are_fingers_up(finger_tips, finger_dips)
            thumb_up, index_up, middle_up, ring_up, pinky_up = fingers_up

            index_tip = finger_tips[1]
            index_finger_x, index_finger_y = int(index_tip.x * img.shape[1]), int(index_tip.y * img.shape[0])

            if gesture_start_time is None:
                gesture_start_time = time.time()

            # Next/Previous detection
            if time.time() - gesture_start_time > 1:
                if prev_x!= 0 and prev_y!= 0:
                    diff_x = index_finger_x - prev_x
                    diff_y = index_finger_y - prev_y

                    if all(fingers_up):  # Palm is open
                        if abs(diff_x) > abs(diff_y):  # Horizontal movement
                            if diff_x > 50:
                                socketio.emit('next', {'action': 'next'})
                            elif diff_x < -50:
                                socketio.emit('previous', {'action': 'previous'})

                gesture_start_time = time.time()
                prev_x, prev_y = index_finger_x, index_finger_y

    cv2.imshow("Gesture Controlled System", img)
    if cv2.waitKey(1) & 0xFF == 27:
        print("e")

    return gesture_start_time, prev_x, prev_y
    
if __name__ == '__main__':
    try:
        socketio.run(app, debug=True)
    finally:
        cap.release()
        cv2.destroyAllWindows()
