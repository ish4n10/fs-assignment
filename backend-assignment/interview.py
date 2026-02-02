import time
import uuid
import json
import config
import constants
import voice
import storage
from question_bank import INTERVIEW_TYPES
from prompts import INTERVIEWER_SYSTEM_PROMPT, build_opening_prompt, GRADING_CRITERIA


def get_gemini_chat(interview_type: str):
    import google.generativeai as genai
    genai.configure(api_key=config.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash", system_instruction=INTERVIEWER_SYSTEM_PROMPT)
    chat = model.start_chat(history=[])
    opening = build_opening_prompt(interview_type)
    response = chat.send_message(opening)
    return chat, response.text.strip()


def run_interview(interview_type: str) -> None:
    if interview_type not in INTERVIEW_TYPES:
        interview_type = "design"
    session_id = str(uuid.uuid4())
    transcript = []
    start = time.time()
    max_sec = constants.INTERVIEW_DURATION_MINUTES * 60

    chat, first_question = get_gemini_chat(interview_type)
    transcript.append(("interviewer", first_question))
    print("\nInterview started. You have {} min. \n".format(constants.INTERVIEW_DURATION_MINUTES))
    voice.speak_text(first_question)

    end_phrases = ["thats all", "we're done", "end of interview", "thank you for your time"]
    while (time.time() - start) < max_sec:
        user_text = voice.listen_to_user()
        if not user_text:
            user_text = "(no speech detected)"
        transcript.append(("user", user_text))
        print("You said:", user_text[:200] + ("..." if len(user_text) > 200 else ""))

        response = chat.send_message(
            "Candidate's answer: " + user_text + "\n\nRespond with your next question or brief follow-up only. One question at a time."
        )
        interviewer_text = response.text.strip()
        transcript.append(("interviewer", interviewer_text))
        voice.speak_text(interviewer_text)

        if any(x in interviewer_text.lower() for x in end_phrases):
            break

    print("\nInterview time over. Grading...\n")
    grades = grade_interview(transcript)
    storage.save_session_transcript(session_id, transcript)
    storage.save_session_log(session_id, {"interview_type": interview_type, "grades": grades})

    print("\nGrades\n")
    for k, v in grades.items():
        print(f"  {k}: {v}")
    print()


def grade_interview(transcript: list) -> dict:
    import google.generativeai as genai
    genai.configure(api_key=config.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")

    lines = [f"{role}: {text}" for role, text in transcript]
    full = "\n".join(lines)
    prompt = f"Interview transcript:\n\n{full}\n\n{GRADING_CRITERIA}"
    response = model.generate_content(prompt)
    text = response.text.strip()
    if "```" in text:
        text = text.split("```")[1].replace("json", "").strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"structure": 0, "clarity": 0, "depth": 0, "metrics": 0, "completeness": 0}
