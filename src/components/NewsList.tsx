import type { News } from '../types/news'
import { NewsCard } from './NewsCard'
import { NewsListSkeleton } from './NewsSkeleton'

interface NewsListProps {
  news: News[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function NewsList({ news, loading, error, onRetry }: NewsListProps) {
  if (loading && news.length === 0) {
    return <NewsListSkeleton />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          重试
        </button>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600 text-lg mb-2">暂无新闻</p>
        <p className="text-gray-500 text-sm">请尝试选择其他日期或分类</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          共找到 <span className="font-bold text-primary">{news.length}</span> 条新闻
        </p>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
          />
        ))}
      </div>
    </div>
  )
}
