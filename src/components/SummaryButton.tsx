import { FileText, Loader2 } from 'lucide-react'

interface SummaryButtonProps {
  onClick: () => void
  loading: boolean
  hasSummary: boolean
}

export function SummaryButton({ onClick, loading, hasSummary }: SummaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || hasSummary}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${hasSummary
          ? 'bg-green-100 text-green-800 cursor-default'
          : loading
          ? 'bg-gray-100 text-gray-400 cursor-wait'
          : 'bg-accent hover:bg-accent-hover text-white shadow-md hover:shadow-lg'
        }
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>生成中...</span>
        </>
      ) : hasSummary ? (
        <>
          <FileText className="w-4 h-4" />
          <span>已生成</span>
        </>
      ) : (
        <>
          <FileText className="w-4 h-4" />
          <span>生成摘要</span>
        </>
      )}
    </button>
  )
}
