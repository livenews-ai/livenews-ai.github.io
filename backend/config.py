import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./news.db')

NEWS_SOURCES = {
    'openai': {
        'name': 'OpenAI Blog',
        'url': 'https://openai.com/blog/rss.xml',
        'type': 'rss',
        'category': 'tool',
        'trust_level': 'S',
        'priority': 10
    },
    'deepmind': {
        'name': 'Google DeepMind',
        'url': 'https://deepmind.google/blog/rss.xml',
        'type': 'rss',
        'category': 'academic',
        'trust_level': 'S',
        'priority': 9
    },
    'google_ai': {
        'name': 'Google AI Blog',
        'url': 'https://blog.google/technology/ai/rss/',
        'type': 'rss',
        'category': 'industry',
        'trust_level': 'S',
        'priority': 8
    },
    'huggingface': {
        'name': 'Hugging Face Blog',
        'url': 'https://huggingface.co/blog/feed.xml',
        'type': 'rss',
        'category': 'tool',
        'trust_level': 'S',
        'priority': 9
    },
    'semianalysis': {
        'name': 'SemiAnalysis',
        'url': 'https://semianalysis.com/feed/',
        'type': 'rss',
        'category': 'chip',
        'trust_level': 'S',
        'priority': 10
    },
    'techcrunch_ai': {
        'name': 'TechCrunch AI',
        'url': 'https://techcrunch.com/category/artificial-intelligence/feed/',
        'type': 'rss',
        'category': 'industry',
        'trust_level': 'S',
        'priority': 6
    },
    'venturebeat_ai': {
        'name': 'VentureBeat AI',
        'url': 'https://venturebeat.com/category/ai/feed/',
        'type': 'rss',
        'category': 'industry',
        'trust_level': 'S',
        'priority': 6
    },
    'hackernews': {
        'name': 'Hacker News',
        'url': 'https://hnrss.org/frontpage',
        'type': 'rss',
        'category': 'industry',
        'trust_level': 'A',
        'priority': 5
    },
    'arxiv': {
        'name': 'ArXiv CS.AI',
        'url': 'http://export.arxiv.org/api/query?search_query=cat:cs.AI&max_results=15&sortBy=submittedDate&sortOrder=descending',
        'type': 'api',
        'category': 'academic',
        'trust_level': 'S',
        'priority': 7
    },
    'qbitai': {
        'name': '量子位',
        'url': 'https://www.qbitai.com/feed',
        'type': 'rss',
        'category': 'industry',
        'trust_level': 'A',
        'priority': 5
    },
    'mit_tr': {
        'name': 'MIT Tech Review',
        'url': 'https://www.technologyreview.com/feed/',
        'type': 'rss',
        'category': 'industry',
        'trust_level': 'S',
        'priority': 7
    },
}

CATEGORY_CONFIG = {
    'chip': {
        'label': 'AI芯片动态',
        'emoji': '🔴',
        'keywords': ['chip', 'gpu', 'nvidia', 'amd', 'intel', 'huawei', '芯片', 'GPU', '算力',
                     'accelerator', 'semiconductor', 'tpu', 'npu', 'gaudi', 'blackwell',
                     'cerebras', 'wafer', 'fab', 'tsmc', '数据中心',
                     'colossus', 'groqchip', 'samba', 'tenstorrent', 'hbm', 'dram',
                     'silicon', 'asic', 'fpga', 'die bank', 'ramp'],
        'strict_keywords': ['chip', 'gpu', 'nvidia', 'amd', 'intel', 'huawei', 'tsmc',
                           'semiconductor', 'tpu', 'npu', 'gaudi', 'blackwell', 'cerebras',
                           'hbm', 'silicon', 'asic', 'fpga', 'wafer', 'fab', 'accelerator']
    },
    'tool': {
        'label': '工具推荐',
        'emoji': '🟢',
        'keywords': ['copilot', 'chatgpt', 'claude', 'gemini', 'gpt', 'open source',
                    '开源', 'coding assistant', 'agent', 'mcp', 'rag', 'fine-tun',
                    'hugging face', 'api', 'sdk', 'framework',
                    'cursor', 'windsurf', 'codeium', 'v0', 'bolt', 'codex',
                    'model release', 'deploy', 'plugin', 'extension'],
        'strict_keywords': ['copilot', 'chatgpt', 'claude', 'gpt-4', 'gpt-5',
                           'open source', '开源', 'agent', 'mcp', 'rag',
                           'hugging face', 'api', 'sdk', 'framework', 'codex']
    },
    'industry': {
        'label': '行业动态',
        'emoji': '🔵',
        'keywords': ['funding', 'investment', '融资', '投资', 'ipo', 'acquisition',
                    'startup', 'revenue', 'market', 'regulation', 'policy',
                    '监管', '安全', 'openai', 'anthropic', 'deepmind', 'meta ai',
                    'microsoft ai', 'google ai', 'amazon ai', 'partnership',
                    'launches', 'announces', '发布', '合作', '融资'],
        'strict_keywords': ['funding', 'investment', 'ipo', 'acquisition', 'startup',
                           'revenue', 'regulation', 'policy', 'partnership']
    },
    'academic': {
        'label': '学术精选',
        'emoji': '🟣',
        'keywords': ['paper', 'research', 'study', 'arxiv', '论文', '研究', '学术',
                    'benchmark', 'neurips', 'icml', 'iclr',
                    'diffusion', 'reinforcement', 'multimodal', 'reasoning',
                    'embodied', 'robotics', 'autonomy'],
        'strict_keywords': ['paper', 'research', 'arxiv', '论文', '研究',
                           'benchmark', 'neurips', 'icml', 'iclr']
    }
}

NOISE_KEYWORDS = [
    'celebrity', 'gossip', 'movie', 'music', 'sport', 'fashion',
    'recipe', 'travel', 'horoscope', 'astrology', 'lottery',
    '明星', '八卦', '电影', '音乐', '体育', '时尚', '旅游',
    'beats solo', 'headphone', 'earbuds', 'purifier', 'vacuum',
    '耳机', '净化器', '吸尘器', '电动牙刷', '电动剃须刀',
    'crypto', 'bitcoin', 'nft', 'blockchain', '加密货币',
    'gaming chair', 'keyboard', 'mouse review',
]

MAX_DAILY_NEWS = 20
