import json
import config


def save_session_transcript(session_id: str, lines: list) -> None:
    config.TRANSCRIPTS_DIR.mkdir(parents=True, exist_ok=True)
    path = config.TRANSCRIPTS_DIR / f"{session_id}.txt"
    with open(path, "w", encoding="utf-8") as f:
        for role, text in lines:
            f.write(f"{role}: {text}\n")
    print(f"Transcript saved: {path}")


def save_session_log(session_id: str, data: dict) -> None:
    config.LOGS_DIR.mkdir(parents=True, exist_ok=True)
    path = config.LOGS_DIR / f"{session_id}.json"
    out = {
        "session_id": session_id,
        "interview_type": data.get("interview_type"),
        "grades": data.get("grades", {}),
    }
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)
    print(f"Log saved: {path}")
