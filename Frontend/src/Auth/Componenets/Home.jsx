import React, { useState, useRef } from 'react'
import { useInterview } from '../Hooks/userInterview.js'
import { useNavigate } from 'react-router'

function Home() {
  const { generateReport } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [fileName, setFileName] = useState(null)
  const [charCount, setCharCount] = useState(0)
  const resumeInputRef = useRef(null)
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, resume: resumeFile, selfDescription })
    console.log(data)
    navigate(`/Interview/${data._id}`)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-12">

      <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">
        Build a winning strategy
      </p>
      <h1 className="text-white text-2xl sm:text-3xl font-bold mb-1">Interview Prep</h1>
      <p className="text-gray-500 text-sm mb-8">Upload your resume and get a personalized interview report</p>

      <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">

          {/* LEFT — Job Description */}
          <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="text-white font-semibold text-sm">Target Job Description</h2>
              </div>
              <span className="text-xs text-pink-500 border border-pink-500 px-2 py-0.5 rounded font-semibold tracking-wider">
                REQUIRED
              </span>
            </div>

            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value)
                setCharCount(e.target.value.length)
              }}
              maxLength={5000}
              rows={12}
              placeholder="Paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all"
            />
            <p className="text-right text-xs text-gray-600 mt-2">{charCount} / 5000 chars</p>
          </div>

          {/* RIGHT — Your Profile */}
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-white font-semibold text-sm">Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-gray-300 text-xs font-semibold">Upload Resume</p>
                <span className="text-xs text-emerald-400 border border-emerald-400 px-2 py-0.5 rounded font-semibold tracking-wider">
                  BEST RESULTS
                </span>
              </div>

              <label className={`block border-2 border-dashed rounded-xl px-6 py-8 text-center transition-all cursor-pointer group ${
                fileName
                  ? "border-emerald-500 bg-emerald-500/5"
                  : "border-gray-700 hover:border-pink-500 hover:bg-gray-800"
              }`}>
                <div className="flex justify-center mb-2">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                    fileName
                      ? "bg-emerald-500/10 border-emerald-500"
                      : "bg-gray-800 border-gray-700 group-hover:border-pink-500"
                  }`}>
                    {fileName ? (
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    )}
                  </div>
                </div>

                {fileName ? (
                  <>
                    <p className="text-emerald-400 text-sm font-semibold truncate px-4">{fileName}</p>
                    <p className="text-gray-600 text-xs mt-1">Click to change file</p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 text-sm font-medium">Click to upload or drag & drop</p>
                    <p className="text-gray-600 text-xs mt-1">PDF only (Max 5MB)</p>
                  </>
                )}

                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files[0]?.name || null)}
                />
              </label>
            </div>

            {/* AND Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-gray-700" />
              <span className="text-gray-600 text-xs">And</span>
              <div className="h-px flex-1 bg-gray-700" />
            </div>

            {/* Self Description */}
            <div>
              <p className="text-gray-300 text-xs font-semibold mb-2">Quick Self-Description</p>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                rows={4}
                placeholder="Briefly describe your experience, key skills, and years of experience..."
                className="w-full bg-transparent border border-pink-500 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none transition-all"
              />
            </div>

            {/* Info box */}
            <div className="mt-4 bg-indigo-950 border border-indigo-800 rounded-xl px-4 py-3 flex items-start gap-2">
              <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-indigo-300 text-xs leading-relaxed">
                Both a <span className="font-semibold text-white">Resume</span> and a{" "}
                <span className="font-semibold text-white">Self Description</span> are required to generate a personalized plan.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-800 gap-4">
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <svg className="w-3.5 h-3.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI-Powered Strategy Generation • Approx 30s
          </div>
          <button
            onClick={handleGenerateReport}
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home