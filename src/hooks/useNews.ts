import { useState, useEffect, useCallback } from 'react'
import type { News, Category, SummaryCategory } from '../types/news'
import { api } from '../services/api'

const getChinaDate = (): string => {
  const now = new Date()
  const offset = 8 * 60
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const chinaTime = new Date(utc + offset * 60000)
  return chinaTime.toISOString().split('T')[0]
}

export function useNews() {
  const [news, setNews] = useState<News[]>([])
  const [categories] = useState<Category[]>([
    { value: 'all', label: '全部', emoji: '📋' },
    { value: 'chip', label: 'AI芯片动态', emoji: '🔴' },
    { value: 'tool', label: '工具与实战', emoji: '🟢' },
    { value: 'industry', label: '行业动态', emoji: '🔵' },
    { value: 'academic', label: '学术精选', emoji: '🟣' },
  ])
  const [selectedDate, setSelectedDate] = useState(getChinaDate)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dailySummaryData, setDailySummaryData] = useState<SummaryCategory[] | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [backendReady, setBackendReady] = useState(false)

  const checkBackendHealth = useCallback(async (): Promise<boolean> => {
    return await api.healthCheck()
  }, [])

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.getNews(selectedDate, selectedCategory)
      setNews(response.data.news)
      setBackendReady(true)
    } catch (err) {
      if (!backendReady) {
        setBackendReady(false)
      }
      setError(err instanceof Error ? err.message : '获取新闻失败')
    } finally {
      setLoading(false)
    }
  }, [selectedDate, selectedCategory, backendReady])

  const generateDailySummary = async () => {
    if (summaryLoading || dailySummaryData) return
    setSummaryLoading(true)
    try {
      const response = await api.getDailySummary(selectedDate)
      if (response.success) {
        setDailySummaryData(response.data.summary_data)
      }
    } catch {
    } finally {
      setSummaryLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    const maxAttempts = 60

    async function pollUntilReady() {
      while (!cancelled && attempts < maxAttempts) {
        attempts++
        const isReady = await checkBackendHealth()
        if (isReady && !cancelled) {
          setBackendReady(true)
          break
        }
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
      if (!cancelled) {
        fetchNews()
      }
    }

    pollUntilReady()

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (backendReady) {
      fetchNews()
    }
  }, [selectedDate, selectedCategory])

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
    backendReady,
    setSelectedDate,
    setSelectedCategory,
    generateDailySummary,
    fetchNews,
  }
}
