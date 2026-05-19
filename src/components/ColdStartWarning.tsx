import { useEffect, useState } from 'react'

interface ColdStartWarningProps {
  loading: boolean
  backendReady?: boolean
}

export function ColdStartWarning({ loading, backendReady }: ColdStartWarningProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    if (backendReady || !loading) {
      setShowWarning(false)
      setElapsedSeconds(0)
      return
    }

    const timer = setTimeout(() => {
      setShowWarning(true)
    }, 3000)

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [loading, backendReady])

  if (!showWarning || backendReady) {
    return null
  }

  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="text-blue-600 mt-0.5 text-lg">⏳</div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-800 mb-1">服务器正在启动中...</h3>
          <p className="text-blue-700 text-sm mb-2">
            后端服务正在唤醒中，已等待 <span className="font-mono font-bold">{timeStr}</span>。
            通常需要1-2分钟，请耐心等待。
          </p>
          <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(elapsedSeconds / 120 * 100, 95)}%` }}
            />
          </div>
          <p className="text-blue-500 text-xs mt-1">正在连接后端服务器...</p>
        </div>
      </div>
    </div>
  )
}
