from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import openai
import os
from dotenv import load_dotenv
import json
from pathlib import Path
import base64
from io import BytesIO
from PIL import Image
import requests

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI setup
openai.api_key = os.getenv("OPENAI_API_KEY")

# Directories
UPLOAD_DIR = Path("uploads")
VIDEO_DIR = Path("videos")
UPLOAD_DIR.mkdir(exist_ok=True)
VIDEO_DIR.mkdir(exist_ok=True)

# D-ID API credentials (you'll need to sign up at https://www.d-id.com/)
DID_API_KEY = os.getenv("DID_API_KEY", "")


@app.get("/")
def read_root():
    return {"message": "AI Mock Interview Backend API"}


@app.post("/api/upload-avatar")
async def upload_avatar(file: UploadFile = File(...)):
    """Upload passport size photo for talking avatar"""
    try:
        # Save uploaded image
        file_path = UPLOAD_DIR / f"avatar_{file.filename}"
        contents = await file.read()
        
        with open(file_path, "wb") as f:
            f.write(contents)
        
        # Validate image
        img = Image.open(file_path)
        img.thumbnail((512, 512))  # Resize for optimization
        img.save(file_path)
        
        return {
            "success": True,
            "filename": file.filename,
            "path": str(file_path)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-mcq")
async def generate_mcq(post: str = Form(...), question_number: int = Form(1)):
    """Generate MCQ question using OpenAI"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"You are an expert interviewer for teaching post: {post}. Generate MCQ questions in Hindi/Hinglish."
                },
                {
                    "role": "user",
                    "content": f"Generate question {question_number} of 7 as MCQ with 4 options. Return ONLY valid JSON: {{\"question\": \"text\", \"options\": [\"A\", \"B\", \"C\", \"D\"], \"correctAnswer\": 0}}"
                }
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        text = response.choices[0].message.content
        
        # Extract JSON
        import re
        match = re.search(r'\{[\s\S]*\}', text)
        if match:
            data = json.loads(match.group(0))
            return data
        else:
            raise ValueError("Invalid response format")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-video")
async def generate_video(
    text: str = Form(...),
    avatar_path: str = Form(...)
):
    """Generate talking head video with lip sync using OpenAI TTS + D-ID"""
    try:
        # Step 1: Generate audio using OpenAI TTS
        tts_response = openai.audio.speech.create(
            model="tts-1",
            voice="nova",  # Female voice
            input=text
        )
        
        audio_path = VIDEO_DIR / "temp_audio.mp3"
        tts_response.stream_to_file(audio_path)
        
        # Step 2: Use D-ID API for lip sync video generation
        if DID_API_KEY:
            video_url = await create_did_video(avatar_path, str(audio_path))
            return {
                "success": True,
                "video_url": video_url,
                "type": "did"
            }
        else:
            # Fallback: Return audio only (no video)
            return {
                "success": True,
                "audio_path": str(audio_path),
                "type": "audio_only",
                "message": "D-ID API key not configured. Audio generated only."
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def create_did_video(image_path: str, audio_path: str):
    """Create talking head video using D-ID API"""
    
    # Read image as base64
    with open(image_path, "rb") as f:
        img_data = base64.b64encode(f.read()).decode()
    
    # Read audio as base64
    with open(audio_path, "rb") as f:
        audio_data = base64.b64encode(f.read()).decode()
    
    # D-ID API call
    url = "https://api.d-id.com/talks"
    headers = {
        "Authorization": f"Basic {DID_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "source_url": f"data:image/png;base64,{img_data}",
        "script": {
            "type": "audio",
            "audio_url": f"data:audio/mp3;base64,{audio_data}"
        },
        "config": {
            "stitch": True
        }
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 201:
        talk_id = response.json()["id"]
        
        # Poll for video completion
        import time
        for _ in range(30):  # Wait up to 30 seconds
            time.sleep(1)
            status_response = requests.get(
                f"https://api.d-id.com/talks/{talk_id}",
                headers=headers
            )
            
            if status_response.status_code == 200:
                data = status_response.json()
                if data["status"] == "done":
                    return data["result_url"]
        
        raise Exception("Video generation timeout")
    else:
        raise Exception(f"D-ID API error: {response.text}")


@app.post("/api/evaluate-mcq")
async def evaluate_mcq(
    question: str = Form(...),
    selected_option: int = Form(...),
    correct_answer: int = Form(...),
    post: str = Form(...)
):
    """Evaluate MCQ answer and provide feedback"""
    try:
        is_correct = selected_option == correct_answer
        score = 10 if is_correct else 0
        
        # Generate feedback using OpenAI
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"You are evaluating a teaching candidate for post: {post}. Give brief constructive feedback in Hindi/Hinglish (2-3 sentences)."
                },
                {
                    "role": "user",
                    "content": f"Question: {question}\nAnswer was: {'Correct' if is_correct else 'Wrong'}. Give feedback."
                }
            ],
            temperature=0.7,
            max_tokens=200
        )
        
        feedback = response.choices[0].message.content
        
        return {
            "score": score,
            "feedback": feedback,
            "correctAnswer": correct_answer
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-report")
async def generate_report(
    total_score: int = Form(...),
    max_score: int = Form(...),
    post: str = Form(...)
):
    """Generate final interview report"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"Generate a final interview report for teaching post: {post}."
                },
                {
                    "role": "user",
                    "content": f"Candidate scored {total_score}/{max_score}. Provide 2 strengths and 2 improvements in JSON: {{\"overallScore\": {total_score}, \"strengths\": [], \"improvements\": []}}"
                }
            ],
            temperature=0.7,
            max_tokens=300
        )
        
        text = response.choices[0].message.content
        
        import re
        match = re.search(r'\{[\s\S]*\}', text)
        if match:
            return json.loads(match.group(0))
        else:
            return {
                "overallScore": total_score,
                "strengths": ["Good attempt"],
                "improvements": ["Keep practicing"]
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
