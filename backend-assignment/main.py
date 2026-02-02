import config
from question_bank import INTERVIEW_TYPES
from interview import run_interview

for d in (config.TRANSCRIPTS_DIR, config.AUDIO_DIR, config.LOGS_DIR):
    d.mkdir(parents=True, exist_ok=True)

print("\nPM Mock Interview\n")
for i, (key, label) in enumerate(INTERVIEW_TYPES.items(), 1):
    print(f"  {i}. {label}")
n = len(INTERVIEW_TYPES)
choice = input(f"\nSelect (1–{n}): ").strip() or "1"
try:
    idx = max(0, min(int(choice) - 1, n - 1))
except ValueError:
    idx = 0
key = list(INTERVIEW_TYPES.keys())[idx]
print(f"\nStarting {INTERVIEW_TYPES[key]} (~20 min).\n")
run_interview(key)
