import { Shield, CheckCircle, AlertTriangle } from 'lucide-react'
import type { News } from '../types/news'

interface TrustBadgeProps {
  trustLevel: 'S' | 'A' | 'B'
  multiSourceVerified: boolean
  aiWarning: string | null
}

export function TrustBadge({ trustLevel, multiSourceVerified, aiWarning }: TrustBadgeProps) {
  const badges = []

  if (trustLevel === 'S') {
    badges.push(
      <div key="trust-S" className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
        <Shield className="w-3 h-3" />
        <span>极高可信度</span>
      </div>
    )
  } else if (trustLevel === 'A') {
    badges.push(
      <div key="trust-A" className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
        <Shield className="w-3 h-3" />
        <span>高可信度</span>
      </div>
    )
  } else if (trustLevel === 'B') {
    badges.push(
      <div key="trust-B" className="flex items-center gap-1 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
        <Shield className="w-3 h-3" />
        <span>需自行判断</span>
      </div>
    )
  }

  if (multiSourceVerified) {
    badges.push(
      <div key="multi" className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
        <CheckCircle className="w-3 h-3" />
        <span>多源验证</span>
      </div>
    )
  }

  if (aiWarning) {
    badges.push(
      <div key="warning" className="flex items-center gap-1 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
        <AlertTriangle className="w-3 h-3" />
        <span>⚠️ {aiWarning}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges}
    </div>
  )
}
