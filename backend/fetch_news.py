from services.scraper import NewsScraper
from services.translator import Translator
from database import SessionLocal
from models import News

def main():
    print("Starting initial news fetch...")

    scraper = NewsScraper()
    translator = Translator()

    print("Scraping news from all sources...")
    news_items = scraper.scrape_all()
    print(f"Found {len(news_items)} news items")

    print("Saving to database...")
    scraper.save_to_db(news_items)

    print("Translating news...")
    db = SessionLocal()
    for item in news_items:
        news = db.query(News).filter(News.source_url == item['url']).first()
        if news:
            if not news.title_zh:
                translated_title = translator.translate(item['title'])
                news.title_zh = translated_title
                print(f"  Title: {translated_title[:50]}...")

            if not news.translated_text:
                translated = translator.translate(item['content'])
                news.translated_text = translated

            db.commit()

    db.close()
    print("Initial data fetch completed!")

if __name__ == "__main__":
    main()
