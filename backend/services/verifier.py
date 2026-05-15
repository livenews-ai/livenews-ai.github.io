from groq import Groq
from config import GROQ_API_KEY

class Verifier:
    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

    def verify_news(self, title: str, content: str, source: str) -> dict:
        if not self.client:
            return {
                'has_warning': False,
                'warning_type': None,
                'warning_message': None
            }

        try:
            response = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {
                        "role": "system",
                        "content": """You are a news fact checker. Analyze the following news for potential issues.

Check for:
1. Preprint paper (ArXiv without peer review)
2. Performance claims without context
3. Opinion vs fact distinction
4. Hype or exaggerated claims

Respond in JSON format:
{
    "has_warning": true/false,
    "warning_type": "preprint/performance/opinion/hype/none",
    "warning_message": "Brief explanation if warning exists"
}"""
                    },
                    {
                        "role": "user",
                        "content": f"Title: {title}\n\nContent: {content[:500]}\n\nSource: {source}"
                    }
                ],
                temperature=0.3,
                max_tokens=256
            )

            import json
            result = json.loads(response.choices[0].message.content)
            return result
        except Exception as e:
            print(f"Verification error: {e}")
            return {
                'has_warning': False,
                'warning_type': None,
                'warning_message': None
            }
