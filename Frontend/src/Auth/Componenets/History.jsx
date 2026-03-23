import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useInterview } from "../Hooks/userInterview"
import {useAuth} from '../Hooks/Use.Authcontext.js'
import Loading from "./Loading.jsx"

const severityColor = {
  high:   "bg-red-500/10 text-red-400 border-red-500/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  low:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
}

const scoreColor = (score) => {
  if (score >= 85) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  if (score >= 70) return "text-violet-400 bg-violet-500/10 border-violet-500/20"
  return "text-red-400 bg-red-500/10 border-red-500/20"
}

export default function History() {
  const { reports, getReports } = useInterview()
  const { handlelogout } = useAuth() 
  const navigate = useNavigate()

  useEffect(() => {
    getReports()
  }, [])

  if (!reports) return (
   <Loading/>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Left — Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-semibold transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </button>

        {/* Center — Logo */}
        <span className="font-black text-lg tracking-tight">
          Interview<span className="text-violet-400">AI</span>
        </span>

        {/* Right — New Report + Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Report
          </button>

          <button
            onClick={handlelogout}
            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

      </header>

      {/* ...baaki sab same raho */}
      <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">

        <div className="mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Your Reports</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white">History</h1>
          <p className="text-gray-500 text-sm mt-1">All your previously generated interview reports</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Reports",   value: reports.length, icon: "📋" },
            { label: "Avg Match Score", value: reports.length ? `${Math.round(reports.reduce((a, r) => a + r.matchScore, 0) / reports.length)}%` : "N/A", icon: "🎯" },
            { label: "Best Score",      value: reports.length ? `${Math.max(...reports.map(r => r.matchScore))}%` : "N/A", icon: "🏆" },
            { label: "This Week",       value: reports.filter(r => new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: "📅" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0d0d14] border border-white/5 rounded-2xl px-4 py-4">
              <p className="text-lg mb-1">{stat.icon}</p>
              <p className="text-white font-black text-xl">{stat.value}</p>
              <p className="text-gray-600 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium mb-1">No reports yet</p>
            <p className="text-gray-600 text-sm mb-6">Generate your first interview report to get started</p>
            <button
              onClick={() => navigate("/")}
              className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
            >
              Generate Report
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/Interview/${report._id}`)}
                className="bg-[#0d0d14] border border-white/5 hover:border-violet-500/30 rounded-2xl p-5 cursor-pointer transition-all group hover:bg-white/3"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-1.5 border px-3 py-1 rounded-full ${scoreColor(report.matchScore)}`}>
                    <span className="font-black text-sm">{report.matchScore}%</span>
                    <span className="text-xs opacity-70">match</span>
                  </div>
                  <span className="text-gray-600 text-xs">
                    {new Date(report.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4 min-h-10">
                  {report.skillGaps?.slice(0, 3).map((gap, i) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium border ${severityColor[gap.severity]}`}>
                      {gap.skill}
                    </span>
                  ))}
                  {report.skillGaps?.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/10">
                      +{report.skillGaps.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 border-t border-white/5 pt-3 mb-3">
                  <span>💻 {report.technicalQuestions?.length} Technical</span>
                  <span>🧠 {report.behavioralQuestions?.length} Behavioral</span>
                  <span>🗺️ {report.preparationPlan?.length} Days</span>
                </div>

                <div className="flex items-center justify-end text-gray-600 group-hover:text-violet-400 transition-all">
                  <span className="text-xs mr-1">View Report</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}