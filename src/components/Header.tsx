import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-primary text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-accent" />
          <div>
            <h1 className="text-2xl font-bold font-display">LiveNews AI</h1>
            <p className="text-sm text-gray-300">每日AI新闻精选</p>
          </div>
        </div>
        <div className="text-sm text-gray-300">
          为您呈现最有价值的AI资讯
        </div>
      </div>
    </header>
  )
}
