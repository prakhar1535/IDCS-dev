import cv2
import mediapipe as mp
import time

# Initialize Mediapipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7, min_tracking_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Variables for gestures
gesture_start_time = None
fist_closed = False
maximize = False
minimize = False
was_maximized = False
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

while True:
    success, img = cap.read()
    if not success:
        break

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

            # Fist detection
            is_fist_closed = not any(fingers_up)

            if is_fist_closed and not fist_closed:
                print("Fist closed")
                fist_closed = True
                maximize = False
                minimize = False
            elif not is_fist_closed and fist_closed:
                print("Fist opened")
                fist_closed = False

            # Maximize detection
            if thumb_up and index_up and middle_up and not ring_up and not pinky_up and not fist_closed:
                if not maximize:
                    print("Maximize")
                    maximize = True
                    minimize = False
                    was_maximized = True

            # Minimize detection
            thumb_index_distance = abs(finger_tips[0].x - finger_tips[1].x)
            index_middle_distance = abs(finger_tips[1].x - finger_tips[2].x)
            if not thumb_up and not index_up and not middle_up and not ring_up and not pinky_up and was_maximized:
                if not minimize and thumb_index_distance < 0.05 and index_middle_distance < 0.05:
                    print("Minimize")
                    minimize = True
                    maximize = False
                    was_maximized = False

            # Next/Previous detection
            if time.time() - gesture_start_time > 1:
                if prev_x != 0 and prev_y != 0:
                    diff_x = index_finger_x - prev_x
                    diff_y = index_finger_y - prev_y

                    if all(fingers_up):  # Palm is open
                        if abs(diff_x) > abs(diff_y):  # Horizontal movement
                            if diff_x > 50:
                                print("Next")
                            elif diff_x < -50:
                                print("Previous")

                gesture_start_time = time.time()
                prev_x, prev_y = index_finger_x, index_finger_y

    cv2.imshow("Gesture Controlled System", img)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
