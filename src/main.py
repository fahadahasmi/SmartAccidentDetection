from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from data_transform import transform_image, transform_video
from model_prediction import predict_image, predict_video

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return "Index Page"

@app.post('/')
async def index(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if file.content_type.startswith('image/'):
            data = transform_image(content)
            prediction = predict_image(data)
        elif file.content_type.startswith('video/'):
            data = transform_video(content)
            prediction = predict_video(data)
        else:
            return {"Error": "Unsupported file type."}
        print(prediction)
        return {'Prediction': 'Accident' if prediction[0] == 0 else 'Non Accident'}
    except Exception as e:
        print("Error:", e)
        return {"Error": "Something Bad Happened."}