export interface News {
  id: string
  title: string
  title_zh: string
  original_text: string
  translated_text: string
  category: 'chip' | 'tool' | 'industry' | 'academic'
  category_label: string
  category_emoji: string
  source: string
  source_url: string
  published_at: string
  trust_level: 'S' | 'A' | 'B'
  multi_source_verified: boolean
  ai_warning: string | null
}

export interface Category {
  value: string
  label: string
  emoji: string
}

export interface NewsResponse {
  success: boolean
  data: {
    date: string
    news: News[]
    categories: Category[]
  }
}

export interface SummaryItem {
  title_zh: string
  source: string
  source_url: string
  category_label: string
}

export interface SummaryCategory {
  category: string
  category_label: string
  items: SummaryItem[]
}

export interface SummaryResponse {
  success: boolean
  data: {
    date: string
    summary_data: SummaryCategory[]
    news_count: number
    generated_at: string
  }
}
