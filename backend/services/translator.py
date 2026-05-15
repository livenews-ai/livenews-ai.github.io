from groq import Groq
from config import GROQ_API_KEY

class Translator:
    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

    def translate(self, text: str, target_lang: str = 'Chinese') -> str:
        if not self.client:
            return text

        try:
            response = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {
                        "role": "system",
                        "content": f"You are a professional translator. Translate the following text to {target_lang}. Only output the translated text, no explanations."
                    },
                    {
                        "role": "user",
                        "content": text
                    }
                ],
                temperature=0.3,
                max_tokens=2048
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Translation error: {e}")
            return text

    def translate_batch(self, texts: list) -> list:
        return [self.translate(text) for text in texts]
