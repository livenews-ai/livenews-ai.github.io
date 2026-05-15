from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from services.scraper import NewsScraper
from services.translator import Translator
from database import SessionLocal
from models import News
import asyncio

scheduler = AsyncIOScheduler()

async def fetch_and_process_news():
    print(f"[{datetime.now()}] Starting daily news fetch...")

    scraper = NewsScraper()
    translator = Translator()

    news_items = scraper.scrape_all()
    scraper.save_to_db(news_items)

    db = SessionLocal()
    try:
        for item in news_items:
            news = db.query(News).filter(News.source_url == item['url']).first()
            if news and not news.translated_text:
                translated = translator.translate(item['content'])
                translated_title = translator.translate(item['title'])
                news.translated_text = translated
                news.title_zh = translated_title
                db.commit()
                print(f"Translated: {news.title[:50]}...")
    except Exception as e:
        print(f"Error during translation: {e}")
        db.rollback()
    finally:
        db.close()

    print(f"[{datetime.now()}] Daily news fetch completed")

def cleanup_old_news():
    from datetime import timedelta
    from database import SessionLocal
    from models import News

    db = SessionLocal()
    try:
        from datetime import date
        cutoff_date = date.today() - timedelta(days=7)
        deleted = db.query(News).filter(News.news_date < cutoff_date).delete()
        db.commit()
        print(f"Cleaned up {deleted} old news items")
    except Exception as e:
        print(f"Error during cleanup: {e}")
        db.rollback()
    finally:
        db.close()

def start_scheduler():
    scheduler.add_job(
        fetch_and_process_news,
        CronTrigger(hour=6, minute=0),
        id='fetch_news',
        name='Fetch and process daily news',
        replace_existing=True
    )

    scheduler.add_job(
        cleanup_old_news,
        CronTrigger(hour=7, minute=30),
        id='cleanup_news',
        name='Cleanup old news (7 days)',
        replace_existing=True
    )

    scheduler.start()
    print("Scheduler started - News will be fetched daily at 6:00 AM")

if __name__ == "__main__":
    start_scheduler()
    try:
        asyncio.get_event_loop().run_forever()
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
