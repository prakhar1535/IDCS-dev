from ultralytics import YOLO
import cv2
import cvzone
import math


cap=cv2.VideoCapture(0)
# cap=set(3, 640)
# cap=set(4, 480)

model=YOLO(r'D:\deeplearning\vihaaan\gestures.pt')
classNames = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'afraid', 'afternoon',
               'agree', 'angry', 'animal', 'b', 'baby', 'bad', 'bean', 'bird', 'book', 'bored', 
               'boy', 'bread', 'brother', 'butter', 'bye', 'c', 'cake', 'cat', 'chef', 'chicken', 'chocolate', 'circle', 'close hand', 'coco cola', 'coffee', 
               'come', 'confused', 'cow', 'd', 'dad', 'daughter', 'deaf', 'difficult', 
              'dog', 'drink', 'duck', 'e', 'eat', 'egg', 'eggs',
                'england', 'environment', 'europe', 'excited', 'f', 'family', 'farmer',
                  'father', 'feelings', 'fish', 'flat hand', 'friday',
                  'friend', 'g', 'girl', 'give', 'gold', 'good', 'good afteernoon', 
                'good morning', 'good night', 'goodbye', 'grand', 'h', 'happy', 'hearing', 'hello',
                  'help', 'house', 'how', 'how are you', 'how old', 'i', 'i love you', 'interpreter'
                  , 'j', 'k', 'l', 'love', 'm', 'man', 'may', 'meet', 'milk', 'mine', 'monday', 'more', 
               'morning', 'mother', 'n', 'nervous', 'new', 'nice to meet you', 'night', 'no', 'none',
                 'o', 'okay', 'orange juice', 'p', 'paper', 'party', 'person', 'pig', 'pizza', 'please', 'practice', 'promise', 'proud', 'pumpkin', 'q', 'quiet', 'quite', 'r', 'rainbow', 
                 'repeat', 's', 'sad', 'saturday', 'school', 'sheep', 'shocked', 'sister', 'sit down', 'son', 'sorry', 'stop', 'stressed', 'sugar', 'sunday', 
                 't', 'tea', 'tennis', 'tent', 'thank you', 'thanks', 'thursday', 'tie', 'tired', 'to go', 'to sit', 'to wash', 'tuesday', 'u', 'v', 'w', 'walk', 
                 'wednesday', 'welcome', 'what', 'where', 'woman', 'worried', 'x', 'y', 'year', 'yes', 'z']
while True:
    success, img=cap.read()
    results=model(img,stream=True)
    for r in results:
        boxes=r.boxes
        for box in boxes:
            x1,y1,x2,y2=box.xyxy[0]
            x1,y1,x2,y2= int(x1),int(y1),int(x2),int(y2)
            print(x1,y1,x2,y2)
            cv2.rectangle(img,(x1,y1),(x2,y2),(255,0,255),3)
             #cvzone.cornerRect(img,bbox)
            conf=math.ceil((box.conf[0])*100)/100
            cls=int(box.cls[0])
            currentClass = classNames[cls]
            print(currentClass)
        
            cvzone.putTextRect(img, f'{classNames[cls]} {conf}',
                                   (max(0, x1), max(35, y1)), scale=1, thickness=1,
                                   colorT=(255,255,255),offset=5)
            

    cv2.imshow('image',img)
    cv2.waitKey(1)
    




