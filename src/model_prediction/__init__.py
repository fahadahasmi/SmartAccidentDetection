import numpy as np
import tensorflow as tf

def predict(img):
    model = tf.keras.models.load_model('../Model/AccidentDetection.h5')
    prediction = model.predict(img)
    prediction = np.argmax(prediction,axis=1)
    print('Prediction:',prediction)

    return prediction