import { useState, useEffect, useCallback } from 'react'
import type { News, Category, SummaryCategory } from '../types/news'
import { api } from '../services/api'

export function useNews() {
  const [news, setNews] = useState<News[]>([])
  const [categories] = useState<Category[]>([
    { value: 'all', label: '全部', emoji: '📋' },
    { value: 'chip', label: 'AI芯片动态', emoji: '🔴' },
    { value: 'tool', label: '工具推荐', emoji: '🟢' },
    { value: 'industry', label: '行业动态', emoji: '🔵' },
    { value: 'academic', label: '学术精选', emoji: '🟣' },
  ])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dailySummaryData, setDailySummaryData] = useState<SummaryCategory[] | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.getNews(selectedDate, selectedCategory)
      setNews(response.data.news)
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取新闻失败')
    } finally {
      setLoading(false)
    }
  }, [selectedDate, selectedCategory])

  const generateDailySummary = async () => {
    if (summaryLoading || dailySummaryData) return
    setSummaryLoading(true)
    try {
      const response = await api.getDailySummary(selectedDate)
      if (response.success) {
        setDailySummaryData(response.data.summary_data)
      }
    } catch {
      // ignore
    } finally {
      setSummaryLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  useEffect(() => {
    setDailySummaryData(null)
  }, [selectedDate])

  return {
    news,
    categories,
    selectedDate,
    selectedCategory,
    loading,
    error,
    dailySummaryData,
    summaryLoading,
    setSelectedDate,
    setSelectedCategory,
    generateDailySummary,
    fetchNews,
  }
}
