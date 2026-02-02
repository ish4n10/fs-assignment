import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
TRANSCRIPTS_DIR = DATA_DIR / "transcripts"
AUDIO_DIR = DATA_DIR / "audio"
LOGS_DIR = DATA_DIR / "logs"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GOOGLE_APPLICATION_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "")
