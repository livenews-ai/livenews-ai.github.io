export function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-3 w-32 rounded bg-gray-200" />
        </div>
        <div className="h-6 w-24 rounded bg-gray-200" />
      </div>

      <div className="h-5 w-full rounded bg-gray-200" />
      <div className="h-5 w-5/6 rounded bg-gray-200" />

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>
        <div className="h-8 w-20 rounded bg-gray-200" />
      </div>
    </div>
  )
}

export function NewsListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="space-y-4">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
      </div>
  )
}