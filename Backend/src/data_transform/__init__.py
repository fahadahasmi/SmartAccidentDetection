import numpy as np
import tensorflow as tf
from io import BytesIO
import cv2
import tempfile

def transform_image(img_content):
    img = BytesIO(img_content)
    img = tf.keras.preprocessing.image.load_img(img, target_size=(250, 250))
    img = tf.keras.preprocessing.image.img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def transform_video(video_content):
    # Save video content to a temporary file
    with tempfile.NamedTemporaryFile(delete=False) as temp_video:
        temp_video.write(video_content)
        temp_video_path = temp_video.name

    # Capture video frames
    cap = cv2.VideoCapture(temp_video_path)
    frames = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # Resize and normalize frame
        frame = cv2.resize(frame, (250, 250))
        frame = frame / 255.0
        frames.append(np.expand_dims(frame, axis=0))
    cap.release()

    return frames