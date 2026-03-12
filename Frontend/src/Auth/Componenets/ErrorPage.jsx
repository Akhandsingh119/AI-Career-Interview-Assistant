import React from 'react'

function ErrorPage() {
return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden relative font-mono px-4">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Glow */}
      <div className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-emerald-500 opacity-10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 text-center w-full max-w-lg mx-auto">

        {/* 404 big text */}
        <div className="relative mb-2 sm:mb-4">
          <p
            className="text-7xl sm:text-8xl md:text-9xl font-black text-transparent select-none"
            style={{
              WebkitTextStroke: "2px #00ff88",
              textShadow: "0 0 40px #00ff8866, 0 0 80px #00ff8833"
            }}
          >
            404
          </p>
          <p
            className="text-7xl sm:text-8xl md:text-9xl font-black text-transparent absolute top-0 left-0 w-full select-none opacity-40"
            style={{
              WebkitTextStroke: "2px #ff0055",
              clipPath: "inset(40% 0 50% 0)",
              transform: "translateX(4px)",
            }}
          >
            404
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 justify-center mb-4 sm:mb-6">
          <div className="h-px w-10 sm:w-16 bg-emerald-500 opacity-60" />
          <span className="text-emerald-400 text-xs sm:text-sm tracking-widest uppercase">
            Page Not Found
          </span>
          <div className="h-px w-10 sm:w-16 bg-emerald-500 opacity-60" />
        </div>

        {/* Message */}
        <p className="text-zinc-400 text-sm sm:text-base mb-2 px-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="text-zinc-600 text-xs sm:text-sm mb-8 sm:mb-10 tracking-wider">
          ERROR_CODE: <span className="text-emerald-500">0x00000404</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-zinc-950 font-bold text-sm tracking-widest uppercase hover:bg-emerald-400 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 border border-zinc-700 text-zinc-400 font-bold text-sm tracking-widest uppercase hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Bottom tag */}
        <p className="text-zinc-700 text-xs mt-10 sm:mt-14 tracking-widest">
          &gt; SYSTEM_HALT :: ROUTE_UNRESOLVED
        </p>

      </div>
    </div>
  )
}

export default ErrorPage