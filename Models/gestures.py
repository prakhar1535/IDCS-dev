import cv2
import mediapipe as mp
import pyautogui
import time

# Initialize Mediapipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Variables for controlling the mouse
prev_x, prev_y = 0, 0
dragging = False
gesture_start_time = None

def get_finger_tips(landmarks):
    index_finger_tip = landmarks[mp_hands.HandLandmark.INDEX_FINGER_TIP]
    thumb_tip = landmarks[mp_hands.HandLandmark.THUMB_TIP]
    return index_finger_tip, thumb_tip

def get_distance(point1, point2):
    return ((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2) ** 0.5

while True:
    success, img = cap.read()
    if not success:
        break

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            index_tip, thumb_tip = get_finger_tips(hand_landmarks.landmark)
            index_finger_x, index_finger_y = int(index_tip.x * img.shape[1]), int(index_tip.y * img.shape[0])
            thumb_x, thumb_y = int(thumb_tip.x * img.shape[1]), int(thumb_tip.y * img.shape[0])
            
            cv2.circle(img, (index_finger_x, index_finger_y), 10, (255, 0, 0), cv2.FILLED)
            cv2.circle(img, (thumb_x, thumb_y), 10, (0, 255, 0), cv2.FILLED)

            distance = get_distance(index_tip, thumb_tip)

            if distance < 0.05:
                if not dragging:
                    pyautogui.mouseDown(button='left')
                    dragging = True
                pyautogui.moveTo(index_finger_x, index_finger_y)
            else:
                if dragging:
                    pyautogui.mouseUp(button='left')
                    dragging = False
                pyautogui.moveTo(index_finger_x, index_finger_y)
            
            if gesture_start_time is None:
                gesture_start_time = time.time()

            # Swipe gestures for play/pause, next, previous
            if time.time() - gesture_start_time > 1:
                if prev_x != 0 and prev_y != 0:
                    diff_x = index_finger_x - prev_x
                    diff_y = index_finger_y - prev_y

                    if abs(diff_x) > abs(diff_y):
                        if diff_x > 100:
                            pyautogui.press('right')  # Next
                        elif diff_x < -100:
                            pyautogui.press('left')   # Previous
                    else:
                        if diff_y > 100:
                            pyautogui.press('space')  # Play/Pause

                gesture_start_time = time.time()
                prev_x, prev_y = index_finger_x, index_finger_y

    cv2.imshow("Gesture Controlled Virtual Mouse", img)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
