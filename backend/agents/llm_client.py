import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Inisialisasi Client (Bisa Groq atau OpenAI)
api_key = os.getenv("GROQ_API_KEY", os.getenv("OPENAI_API_KEY"))
base_url = os.getenv("BASE_URL", "https://api.groq.com/openai/v1") # Default Groq

client = OpenAI(
    api_key=api_key,
    base_url=base_url
)

def execute_structured_agent(agent_name: str, system_prompt: str, user_message: str, temperature: float = 0.2) -> dict:
    """Fungsi universal untuk memanggil LLM dan memaksa keluar JSON"""
    print(f"[{agent_name}] Sedang berpikir...")
    
    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b", # Active verified model on Groq API
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=temperature,
            response_format={"type": "json_object"} # INI RAHASIANYA: Paksa JSON!
        )
        
        # Ambil teks mentah
        raw_text = response.choices[0].message.content
        
        # Bersihkan kemungkinan markdown (jaga-jaga)
        clean_text = raw_text.strip()
        if clean_text.startswith("```json"): clean_text = clean_text[7:]
        if clean_text.startswith("```"): clean_text = clean_text[3:]
        if clean_text.endswith("```"): clean_text = clean_text[:-3]
        
        # Ubah ke Dictionary Python
        data = json.loads(clean_text)
        print(f"[{agent_name}] Berhasil.")
        return data
        
    except Exception as e:
        print(f"[{agent_name}] ERROR: {e}")
        return None