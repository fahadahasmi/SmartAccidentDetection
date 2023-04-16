import numpy as np
import tensorflow as tf
from io import BytesIO

def transform(img_content):
    img = BytesIO(img_content)
    img = tf.keras.preprocessing.image.load_img(img,target_size=(250,250))
    img = tf.keras.preprocessing.image.img_to_array(img)
    img = img/255
    img = np.expand_dims(img,axis=0)
    print('Img Shape:',img.shape)
    return img