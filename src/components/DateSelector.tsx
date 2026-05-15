import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { format, subDays, addDays, parseISO } from 'date-fns'

interface DateSelectorProps {
  selectedDate: string
  onDateChange: (date: string) => void
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const today = new Date()
  const minDate = format(subDays(today, 6), 'yyyy-MM-dd')
  const maxDate = format(today, 'yyyy-MM-dd')

  const handlePrevious = () => {
    const current = parseISO(selectedDate)
    const previous = subDays(current, 1)
    const previousStr = format(previous, 'yyyy-MM-dd')
    if (previousStr >= minDate) {
      onDateChange(previousStr)
    }
  }

  const handleNext = () => {
    const current = parseISO(selectedDate)
    const next = addDays(current, 1)
    const nextStr = format(next, 'yyyy-MM-dd')
    if (nextStr <= maxDate) {
      onDateChange(nextStr)
    }
  }

  const currentDate = parseISO(selectedDate)
  const displayDate = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日 星期${WEEKDAYS[currentDate.getDay()]}`
  const isToday = selectedDate === maxDate
  const isEarliest = selectedDate === minDate

  const dateList = []
  for (let i = 6; i >= 0; i--) {
    const d = subDays(today, i)
    const dateStr = format(d, 'yyyy-MM-dd')
    const label = `${d.getMonth() + 1}/${d.getDate()}`
    dateList.push({ dateStr, label, isToday: i === 0 })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-3 mb-3">
        <Calendar className="w-5 h-5 text-primary" />
        <span className="font-medium text-primary">选择日期</span>
        <span className="text-sm text-gray-500">（保留7天历史）</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={isEarliest}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-gray-200"
          aria-label="前一天"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-1 flex-1">
          {dateList.map(({ dateStr, label, isToday: todayFlag }) => (
            <button
              key={dateStr}
              onClick={() => onDateChange(dateStr)}
              className={`flex-1 py-2 px-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedDate === dateStr
                  ? 'bg-primary text-white shadow-md'
                  : todayFlag
                  ? 'bg-accent/10 text-accent hover:bg-accent/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
              {todayFlag && <span className="block text-xs">今天</span>}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={isToday}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-gray-200"
          aria-label="后一天"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 text-center text-sm text-gray-500">
        当前查看：{displayDate}
      </div>
    </div>
  )
}
