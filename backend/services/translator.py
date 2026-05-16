import re
import time
from groq import Groq
from config import GROQ_API_KEY

TITLE_SYSTEM_PROMPT = (
    "You are a professional title translator. "
    "Translate the given title to Simplified Chinese (简体中文). "
    "Rules: 1) Translate word-by-word faithfully, do NOT add any content not in the original. "
    "2) Keep the translated title concise, similar length to the original. "
    "3) Do NOT expand, explain, or elaborate. "
    "4) Use Simplified Chinese only, never Traditional Chinese. "
    "5) Output ONLY the translated Chinese title, nothing else."
)

TEXT_SYSTEM_PROMPT = (
    "You are a professional translator. "
    "Translate the given text to Simplified Chinese (简体中文). "
    "Rules: 1) Translate faithfully, do NOT add any content not in the original. "
    "2) Do NOT expand, explain, summarize, or elaborate. "
    "3) If the original is short, the translation must also be short. "
    "4) Use Simplified Chinese only, never Traditional Chinese. "
    "5) Always use third person, never translate to first person (e.g. 'Parloa leverages' -> 'Parloa使用', NOT '我使用'). "
    "6) Output ONLY the translated Chinese text, nothing else."
)

SUMMARY_SYSTEM_PROMPT = (
    "You are a professional translator and content cleaner. "
    "The input is from a community forum (Reddit/Twitter/GitHub/YouTube) and may contain HTML tables, code blocks, "
    "casual chat, jokes, and off-topic content mixed with valuable technical information. "
    "Your task: 1) Remove all noise: HTML tags, tables, code blocks, greetings, jokes, meta-comments, signatures. "
    "2) Keep all valuable technical content: problem descriptions, methods, results, benchmarks, configurations, lessons learned. "
    "3) Translate the cleaned content to Simplified Chinese (简体中文). "
    "4) Keep the translation length proportional to the useful content - do NOT artificially shorten it. "
    "5) Use Simplified Chinese only, never Traditional Chinese. "
    "6) Always use third person, never translate to first person. "
    "7) Output ONLY the cleaned and translated Chinese text, nothing else."
)


class Translator:
    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

    def _call_groq(self, system_prompt: str, text: str, max_tokens: int = 1024, retries: int = 3) -> str:
        if not self.client:
            return ''
        for attempt in range(retries):
            try:
                response = self.client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": text}
                    ],
                    temperature=0.1,
                    max_tokens=max_tokens
                )
                result = response.choices[0].message.content.strip()
                return result
            except Exception as e:
                print(f"  Translation error (attempt {attempt+1}/{retries}): {e}")
                if attempt < retries - 1:
                    wait = 5 * (attempt + 1)
                    print(f"  Retrying in {wait}s...")
                    time.sleep(wait)
        print(f"  All retries failed for: {text[:50]}...")
        return ''

    def _clean_translation(self, translated: str) -> str:
        if not translated:
            return ''
        translated = re.sub(r'^["\']|["\']$', '', translated.strip())
        prefixes = [
            '翻译：', '翻译:', '标题翻译：', '标题翻译:',
            '中文翻译：', '中文翻译:', '中文：', '中文:',
            'Translation:', 'Chinese:', 'Title:',
        ]
        for prefix in prefixes:
            if translated.startswith(prefix):
                translated = translated[len(prefix):].strip()
        return translated

    def _validate_title_translation(self, translated: str, original: str) -> str:
        if not translated or not original:
            return ''
        zh_chars = len(re.findall(r'[\u4e00-\u9fff]', translated))
        en_words = len(original.split())
        if en_words > 0 and zh_chars > en_words * 4:
            print(f"  Title hallucination detected: {zh_chars} zh chars for {en_words} en words")
            return ''
        if '\n' in translated and len(translated.split('\n')) > 2:
            print(f"  Title hallucination detected: multi-line expansion")
            return ''
        list_marker_pattern = re.compile(r'(?:^|\n)\s*(?:[1-9][.)]|[•])\s')
        if en_words < 10 and list_marker_pattern.search(translated):
            print(f"  Title hallucination detected: list markers in short title")
            return ''
        if zh_chars == 0:
            return translated
        return translated

    def _validate_text_translation(self, translated: str, original: str) -> str:
        if not translated or not original:
            return ''
        zh_chars = len(re.findall(r'[\u4e00-\u9fff]', translated))
        en_words = len(original.split())
        if en_words > 0 and zh_chars > en_words * 5:
            print(f"  Text hallucination detected: {zh_chars} zh chars for {en_words} en words")
            return ''
        if zh_chars == 0:
            return translated
        return translated

    def translate_title(self, title: str) -> str:
        if not title:
            return ''
        translated = self._call_groq(TITLE_SYSTEM_PROMPT, title, max_tokens=256)
        translated = self._clean_translation(translated)
        translated = self._validate_title_translation(translated, title)
        return translated

    def translate_text(self, text: str) -> str:
        if not text:
            return ''
        translated = self._call_groq(TEXT_SYSTEM_PROMPT, text, max_tokens=2048)
        translated = self._clean_translation(translated)
        translated = self._validate_text_translation(translated, text)
        return translated

    def summarize_text(self, text: str) -> str:
        if not text:
            return ''
        summarized = self._call_groq(SUMMARY_SYSTEM_PROMPT, text, max_tokens=2048)
        summarized = self._clean_translation(summarized)
        if summarized:
            zh_chars = len(re.findall(r'[\u4e00-\u9fff]', summarized))
            if zh_chars == 0:
                return ''
        return summarized
