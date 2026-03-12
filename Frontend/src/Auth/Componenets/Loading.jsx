import React from 'react'

function Loading() {
  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center bg-white">

      {/* Spinner */}
      <div className="relative flex items-center justify-center">

        {/* Soft Glow */}
        <div className="absolute w-24 h-24 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>

        {/* Animated Circle */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

      </div>

      {/* Text */}
      <p className="mt-6 text-gray-700 text-lg font-semibold tracking-wide animate-pulse">
        Loading...
      </p>

      {/* Animated dots */}
      <div className="flex gap-2 mt-3">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
      </div>

    </main>
  )
}

export default Loading