import { useState, useEffect, useContext } from "react"
import { useInterview } from "../Hooks/userInterview"
import { useParams } from "react-router-dom"
import Loading from "./Loading"
import {useAuth} from '../Hooks/Use.Authcontext.js'
import {AuthContext} from '../context/auth.context.jsx'
import { useNavigate, Link } from "react-router";


const severityConfig = {
  high:   { color: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/30",     dot: "bg-red-400"     },
  medium: { color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   dot: "bg-amber-400"   },
  low:    { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
}

const navItems = [
  { key: "technical",  label: "Technical",  icon: "💻" },
  { key: "behavioral", label: "Behavioral", icon: "🧠" },
  { key: "roadmap",    label: "Road Map",   icon: "🗺️" },
]

export default function Result() {

    const navigate=useNavigate()

  const context=useContext(AuthContext)
  const { interviewId } = useParams()
  const { report, getAllReportsbyID } = useInterview()
  const {handlelogout}=useAuth()

  const [activeSection, setActiveSection] = useState("technical")
  const [activeIndex, setActiveIndex]     = useState(0)
  const [sidebarOpen, setSidebarOpen]     = useState(false)

  useEffect(() => {
    getAllReportsbyID(interviewId)
  }, [interviewId])


  if (!report) return <Loading />

  const technicalQuestions  = report?.technicalQuestions  || []
  const behavioralQuestions = report?.behavioralQuestions || []
  const preparationPlan     = report?.preparationPlan     || []
  const skillGaps           = report?.skillGaps           || []

  const questions =
    activeSection === "technical"  ? technicalQuestions  :
    activeSection === "behavioral" ? behavioralQuestions :
    preparationPlan

  const safeIndex  = Math.min(activeIndex, questions.length - 1)
  const activeItem = questions[safeIndex] || null

  const handleSection = (key) => {
    setActiveSection(key)
    setActiveIndex(0)
    setSidebarOpen(false)
  }


    function History(){
    
    const{user}=context
    console.log(user.id)
     navigate(`/Interview/History/${user.id}`)
    
     

  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">

      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur px-4 sm:px-8 py-3 flex items-center justify-between gap-4">


          <button
    onClick={History}
    className="flex items-center gap-2 text-gray-400 hover:text-white border border-white/10 hover:border-violet-500/40 px-3 py-1.5 rounded-xl text-xs font-medium transition-all group"
  >
    <svg className="w-3.5 h-3.5 group-hover:text-violet-400 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="hidden sm:block">History</span>
  </button>

  
   
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-400 hover:text-white transition p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-black text-lg tracking-tight">
            Interview<span className="text-violet-400">AI</span>
          </span>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-xl p-1">
          {navItems.map((n) => (
            <button
              key={n.key}
              onClick={() => handleSection(n.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === n.key
                  ? "bg-violet-600 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>

        {/* Match score */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
          <span className="hidden sm:block text-gray-500 text-xs">Match</span>
          <span className="text-violet-300 font-black text-sm">{report.matchScore}%</span>
        </div>

      </header>

      <div className="flex flex-1 overflow-hidden relative">

        {/* ── LEFT SIDEBAR ── */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-20
          w-64 md:w-56 shrink-0
          bg-[#0d0d14] border-r border-white/5
          flex flex-col gap-1 p-4 pt-6 overflow-y-auto
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}>
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-3 px-1">Browse</p>

          {questions.map((q, i) => {
            const label =
              activeSection === "technical"  ? q.technicalQuestion  :
              activeSection === "behavioral" ? q.behavioralQuestion :
              `Day ${q.day} — ${q.focusArea}`
            return (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setSidebarOpen(false) }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs leading-snug transition-all ${
                  safeIndex === i
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                }`}
              >


                <span className="text-gray-600 mr-1 font-mono">{i + 1}.</span>
                {label.length > 60 ? label.slice(0, 60) + "…" : label}
              </button>
            )
          })}

           <button
      onClick={handlelogout}
      className="flex items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </button>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">

          {/* Mobile section tabs */}
          <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-1">
            {navItems.map((n) => (
              <button
                key={n.key}
                onClick={() => handleSection(n.key)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeSection === n.key
                    ? "bg-violet-600 text-white border-violet-600"
                    : "text-gray-400 border-white/10 hover:border-white/20"
                }`}
              >
                {n.icon} {n.label}
              </button>
            ))}
          </div>

          {/* ── TECHNICAL ── */}
          {activeSection === "technical" && activeItem && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                  Technical
                </span>
                <span className="text-gray-600 text-xs">
                  {safeIndex + 1} / {technicalQuestions.length}
                </span>
              </div>

              <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug">
                {activeItem.technicalQuestion}
              </h2>

              <div className="flex items-start gap-2 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                <span className="text-lg">🎯</span>
                <p className="text-gray-400 text-sm leading-relaxed">{activeItem.intention}</p>
              </div>

              <div className="bg-gradient-to-br from-violet-950/40 to-[#0d0d14] border border-violet-500/20 rounded-2xl p-6">
                <p className="text-xs text-violet-400 font-bold uppercase tracking-widest mb-3">✦ Sample Answer</p>
                <p className="text-gray-200 text-sm leading-relaxed">{activeItem.answer}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  disabled={safeIndex === 0}
                  onClick={() => setActiveIndex(i => i - 1)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-violet-500/40 hover:text-white disabled:opacity-30 transition-all"
                >
                  ← Prev
                </button>
                <button
                  disabled={safeIndex === technicalQuestions.length - 1}
                  onClick={() => setActiveIndex(i => i + 1)}
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white disabled:opacity-30 transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── BEHAVIORAL ── */}
          {activeSection === "behavioral" && activeItem && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  Behavioral
                </span>
                <span className="text-gray-600 text-xs">
                  {safeIndex + 1} / {behavioralQuestions.length}
                </span>
              </div>

              <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug">
                {activeItem.behavioralQuestion}
              </h2>

              <div className="flex items-start gap-2 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                <span className="text-lg">🎯</span>
                <p className="text-gray-400 text-sm leading-relaxed">{activeItem.intention}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-950/40 to-[#0d0d14] border border-blue-500/20 rounded-2xl p-6">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">✦ STAR Answer</p>
                <p className="text-gray-200 text-sm leading-relaxed">{activeItem.answer}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  disabled={safeIndex === 0}
                  onClick={() => setActiveIndex(i => i - 1)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-blue-500/40 hover:text-white disabled:opacity-30 transition-all"
                >
                  ← Prev
                </button>
                <button
                  disabled={safeIndex === behavioralQuestions.length - 1}
                  onClick={() => setActiveIndex(i => i + 1)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white disabled:opacity-30 transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── ROADMAP ── */}
          {activeSection === "roadmap" && activeItem && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  Day {activeItem.day} of {preparationPlan.length}
                </span>
              </div>

              <h2 className="text-white text-xl sm:text-2xl font-bold">{activeItem.focusArea}</h2>

              <div className="space-y-3">
                {activeItem.tasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/3 border border-white/8 hover:border-amber-500/20 rounded-2xl px-5 py-4 transition-all group">
                    <span className="w-7 h-7 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold group-hover:bg-amber-500/20 transition-all">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed mt-0.5">{task}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  disabled={safeIndex === 0}
                  onClick={() => setActiveIndex(i => i - 1)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-amber-500/40 hover:text-white disabled:opacity-30 transition-all"
                >
                  ← Prev Day
                </button>
                <button
                  disabled={safeIndex === preparationPlan.length - 1}
                  onClick={() => setActiveIndex(i => i + 1)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-sm font-semibold text-black disabled:opacity-30 transition-all"
                >
                  Next Day →
                </button>
              </div>
            </div>
          )}

        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="hidden lg:flex w-60 shrink-0 border-l border-white/5 bg-[#0d0d14] flex-col p-5 gap-6">

          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Skill Gaps</p>
            <div className="flex flex-wrap gap-2">
              {skillGaps.map((gap, i) => {
                const s = severityConfig[gap.severity]
                return (
                  <span key={i} className={`text-xs px-3 py-1.5 rounded-full font-medium border ${s.bg} ${s.color} ${s.border}`}>
                    {gap.skill}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Legend</p>
            {["high", "medium", "low"].map((s) => (
              <div key={s} className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${severityConfig[s].dot}`} />
                <span className="text-gray-500 text-xs capitalize">{s}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4">
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Match Score</p>
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${report.matchScore}%` }}
              />
            </div>
            <p className="text-right text-xs text-violet-400 font-bold mt-1">{report.matchScore}%</p>
          </div>

        </aside>

      </div>
    </div>
  )
}