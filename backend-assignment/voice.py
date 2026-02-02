import config
import constants
from google.cloud import texttospeech
from google.cloud import speech
from google.cloud.texttospeech import AudioEncoding, SynthesisInput, VoiceSelectionParams, AudioConfig
from google.cloud.speech import RecognitionConfig, RecognitionAudio
import pyaudio


def speak_text(text: str) -> None:
    if not text.strip():
        return
    client = texttospeech.TextToSpeechClient()
    resp = client.synthesize_speech(
        input=SynthesisInput(text=text),
        voice=VoiceSelectionParams(language_code=constants.TTS_LANGUAGE, name="en-US-Neural2-D"),
        audio_config=AudioConfig(
            audio_encoding=AudioEncoding.LINEAR16,
            sample_rate_hertz=constants.TTS_SAMPLE_RATE,
        ),
    )
    p = pyaudio.PyAudio()
    stream = p.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=constants.TTS_SAMPLE_RATE,
        output=True,
    )
    stream.write(resp.audio_content)
    stream.stop_stream()
    stream.close()
    p.terminate()


# using Root MEan Square
def get_chunk_volume(chunk: bytes) -> float:
    import struct
    n = len(chunk) // 2
    if n == 0:
        return 0.0
    samples = struct.unpack(f"{n}h", chunk)
    return (sum(s * s for s in samples) / n) ** 0.5


def listen_to_user(duration_sec: int = None) -> str:

    chunk_size = 1024
    sample_rate = constants.STT_SAMPLE_RATE
    silence_sec = constants.SILENCE_SECONDS
    max_sec = duration_sec or constants.USER_SPEAK_MAX_SECONDS
    threshold = constants.SILENCE_THRESHOLD

    chunks_per_sec = sample_rate // chunk_size
    silence_chunks = int(chunks_per_sec * silence_sec)
    max_chunks = int(chunks_per_sec * max_sec)

    p = pyaudio.PyAudio()
    stream = p.open(
        format=pyaudio.paInt16,
        channels=1,
        rate=sample_rate,
        input=True,
        frames_per_buffer=chunk_size,
    )
    print("Listening: ")
    frames = []
    quiet_count = 0
    for _ in range(max_chunks):
        data = stream.read(chunk_size, exception_on_overflow=False)
        frames.append(data)
        if get_chunk_volume(data) < threshold:
            quiet_count += 1
            if quiet_count >= silence_chunks:
                break
        else:
            quiet_count = 0
    stream.stop_stream()
    stream.close()
    p.terminate()

    audio_bytes = b"".join(frames)
    stt_client = speech.SpeechClient()
    rec_config = RecognitionConfig(
        encoding=RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=sample_rate,
        language_code=constants.STT_LANGUAGE,
    )
    resp = stt_client.recognize(config=rec_config, audio=RecognitionAudio(content=audio_bytes))
    text = "".join(r.alternatives[0].transcript for r in resp.results) if resp.results else ""
    return text.strip()
