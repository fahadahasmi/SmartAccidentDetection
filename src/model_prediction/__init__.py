import numpy as np
import tensorflow as tf

# Load the model once at the module level to avoid reloading it for every prediction
model = tf.keras.models.load_model('../Model/AccidentDetection.h5')

def predict_image(img):
    prediction = model.predict(img)
    prediction = np.argmax(prediction, axis=1)
    return prediction

def predict_video(video_frames):
    # Assuming video_frames is a list or array of frames
    predictions = [np.argmax(model.predict(frame), axis=1) for frame in video_frames]
    # Aggregate predictions, e.g., majority voting
    final_prediction = max(set(predictions), key=predictions.count)
    return final_prediction