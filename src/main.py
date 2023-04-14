from fastapi import FastAPI, File, UploadFile
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = FastAPI()

model = load_model('../Model/AccidentDetection.h5')

@app.get('/')
def index():
    return "Index Page"

@app.post('/')
async def index(file: UploadFile = File(...)):
    try:
        img_content = await file.read()
        with open(file.filename,'wb') as f:
            f.write(img_content)
        img = load_img(file.filename,target_size=(250,250))
        img = img_to_array(img)
        img = np.expand_dims(img,axis=0)
        print('Img Shape:',img.shape)
        prediction = model.predict(img)
        prediction = prediction.astype('float32')
        print(prediction)
        return prediction
    except Exception as e:
        print("Error:",e)
        return e