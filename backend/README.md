# AI Mock Interview Backend (Python FastAPI)

## Features
- **Talking Head Video Generation** - Passport photo to AI video with lip sync
- **OpenAI GPT-4** - MCQ question generation & evaluation
- **OpenAI TTS** - Text-to-speech for avatar voice
- **D-ID API** - Lip sync video generation (optional)

## Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create `.env` file in backend folder:
```env
OPENAI_API_KEY=your-openai-key-here
DID_API_KEY=your-did-api-key-here  # Optional
```

### 3. Run Backend Server
```bash
python main.py
```

Server will run on: http://localhost:8000

## API Endpoints

### POST /api/upload-avatar
Upload passport size photo
- **Body:** `multipart/form-data` with `file`
- **Returns:** `{success, filename, path}`

### POST /api/generate-mcq
Generate MCQ question
- **Body:** `post` (teaching post), `question_number`
- **Returns:** `{question, options[], correctAnswer}`

### POST /api/generate-video
Generate talking head video with lip sync
- **Body:** `text`, `avatar_path`
- **Returns:** `{success, video_url}` or `{success, audio_path}`

### POST /api/evaluate-mcq
Evaluate answer and get feedback
- **Body:** `question`, `selected_option`, `correct_answer`, `post`
- **Returns:** `{score, feedback, correctAnswer}`

### POST /api/generate-report
Generate final report
- **Body:** `total_score`, `max_score`, `post`
- **Returns:** `{overallScore, strengths[], improvements[]}`

## D-ID API Setup (Optional)

1. Sign up at https://www.d-id.com/
2. Get API key from dashboard
3. Add to `.env`: `DID_API_KEY=your-key`

Without D-ID, system will use audio-only mode (OpenAI TTS).

## Alternative: Wav2Lip (Free, Local)

For free lip sync video generation, you can use Wav2Lip:

```bash
# Install Wav2Lip
git clone https://github.com/Rudrabha/Wav2Lip.git
cd Wav2Lip
pip install -r requirements.txt

# Download pretrained model
wget 'https://iiitaphyd-my.sharepoint.com/personal/radrabha_m_research_iiit_ac_in/_layouts/15/download.aspx?share=EdjI7bZlgApMqsVoEUUXpLsBxqXbn5z8VTmoxp55YNDcIA' -O 'checkpoints/wav2lip_gan.pth'
```

## Tech Stack
- FastAPI - Web framework
- OpenAI API - GPT-4 + TTS
- D-ID API - Lip sync video (optional)
- Pillow - Image processing
- Uvicorn - ASGI server
