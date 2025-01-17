from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from data_transform import transform
from model_prediction import predict

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/')
async def index(file: UploadFile = File(...)):
    try:
        img_content = await file.read()
        img = transform(img_content)
        prediction = predict(img)
        if prediction[0] == 0:
            return {'Prediction':'Accident'}
        else:
            return {'Prediction':'Non Accident'}
    except Exception as e:
        print("Error:",e)
        return {"Error":"Something Bad Happened."}