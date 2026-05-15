from sqlalchemy import Column, String, Text, DateTime, Date, Boolean, Integer
from sqlalchemy.sql import func
from database import Base
import uuid

class News(Base):
    __tablename__ = 'news'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(Text, nullable=False)
    title_zh = Column(Text, nullable=True)
    original_text = Column(Text, nullable=False)
    translated_text = Column(Text, nullable=True)
    category = Column(String(20), nullable=False)
    category_label = Column(String(50), nullable=False)
    category_emoji = Column(String(10), nullable=False)
    source = Column(String(100), nullable=False)
    source_url = Column(Text, nullable=False)
    published_at = Column(DateTime, nullable=False)
    trust_level = Column(String(1), nullable=False, default='B')
    multi_source_verified = Column(Boolean, default=False)
    ai_warning = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    news_date = Column(Date, nullable=False)
    summary_cache = Column(Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'title_zh': self.title_zh,
            'original_text': self.original_text,
            'translated_text': self.translated_text,
            'category': self.category,
            'category_label': self.category_label,
            'category_emoji': self.category_emoji,
            'source': self.source,
            'source_url': self.source_url,
            'published_at': self.published_at.isoformat() if self.published_at else None,
            'trust_level': self.trust_level,
            'multi_source_verified': self.multi_source_verified,
            'ai_warning': self.ai_warning,
            'summary': self.summary_cache
        }
