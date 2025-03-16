export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[600px] bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        <div className="space-y-6">
          <div className="h-[300px] bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-[300px] bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

