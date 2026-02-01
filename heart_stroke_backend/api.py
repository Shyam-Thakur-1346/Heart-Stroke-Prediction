import pandas as pd
import joblib
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS for Next.js
# 🌍 Enable CORS (for frontend)
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model files
model = joblib.load("knn_heart_model.pkl")
scaler = joblib.load("heart_scaler.pkl")
expected_columns = joblib.load("heart_columns.pkl")


# Input schema (FRONTEND FORMAT)
class HeartData(BaseModel):
    Age: int
    Sex: str
    ChestPainType: str
    RestingBP: int
    Cholesterol: int
    FastingBS: int
    RestingECG: str
    MaxHR: int
    ExerciseAngina: str
    Oldpeak: float
    ST_Slope: str


@app.get("/")
def home():
    return {"message": "API Running"}


@app.post("/predict")
def predict(data: HeartData):
    try:
        # Convert to dict
        raw_input = data.dict()

        # Create base numeric fields
        input_dict = {
            "Age": raw_input["Age"],
            "RestingBP": raw_input["RestingBP"],
            "Cholesterol": raw_input["Cholesterol"],
            "FastingBS": raw_input["FastingBS"],
            "MaxHR": raw_input["MaxHR"],
            "Oldpeak": raw_input["Oldpeak"],
        }

        # Add one-hot encoded fields
        input_dict[f"Sex_{raw_input['Sex']}"] = 1
        input_dict[f"ChestPainType_{raw_input['ChestPainType']}"] = 1
        input_dict[f"RestingECG_{raw_input['RestingECG']}"] = 1
        input_dict[f"ExerciseAngina_{raw_input['ExerciseAngina']}"] = 1
        input_dict[f"ST_Slope_{raw_input['ST_Slope']}"] = 1

        # DataFrame
        input_df = pd.DataFrame([input_dict])

        # Fill missing columns with 0
        for col in expected_columns:
            if col not in input_df.columns:
                input_df[col] = 0

        # Correct order
        input_df = input_df[expected_columns]

        # Scale
        scaled_input = scaler.transform(input_df)

        # Predict
        prediction = model.predict(scaled_input)[0]
        prob = model.predict_proba(scaled_input)[0][1]

        return {
            "prediction": int(prediction),
            "probability": round(float(prob) * 100, 2),
            "result": "High Risk" if prediction == 1 else "Low Risk"
        }

    except Exception as e:
        return {"error": str(e)}
