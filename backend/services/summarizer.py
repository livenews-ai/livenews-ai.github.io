from groq import Groq
from config import GROQ_API_KEY

class Summarizer:
    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

    def summarize(self, text: str) -> str:
        if not self.client:
            return "摘要功能需要配置 API Key"

        try:
            response = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {
                        "role": "system",
                        "content": """You are a professional news summarizer. Summarize the following news article in a concise format with 2-3 sentences.

Format your response as:
🎯 核心要点：[One sentence summary]
📌 关键细节：[2-3 key points]
💡 为什么重要：[One sentence on why this matters]

Keep each section brief and informative."""
                    },
                    {
                        "role": "user",
                        "content": text
                    }
                ],
                temperature=0.5,
                max_tokens=512
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Summarization error: {e}")
            return f"摘要生成失败: {str(e)}"
