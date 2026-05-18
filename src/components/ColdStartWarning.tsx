import { useEffect, useState } from 'react'

interface ColdStartWarningProps {
  loading: boolean
}

export function ColdStartWarning({ loading }: ColdStartWarningProps) {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (!loading) {
      setShowWarning(false)
      return
    }

    const timer = setTimeout(() => {
      setShowWarning(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [loading])

  if (!showWarning || !loading) {
    return null
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="text-blue-600 mt-0.5">💡</div>
        <div>
          <h3 className="font-semibold text-blue-800 mb-1">服务器正在启动中...</h3>
          <p className="text-blue-700 text-sm">
            Render免费版在无访问时会休眠，首次启动通常需要1-2分钟。
            <br />请耐心等待，我们正在努力连接服务器！
          </p>
        </div>
      </div>
    </div>
  )
}