import React from "react"

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-6 ${className}`}>
      {/* Search bar skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 h-12 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg"></div>
        <div className="flex gap-2 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-16 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full flex-shrink-0"></div>
          ))}
        </div>
      </div>

      {/* Contact cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-1/2"></div>
              </div>
              <div className="h-6 w-6 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full"></div>
            </div>

            {/* Contact info */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-2/3"></div>
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-3/4"></div>
            </div>

            {/* Category badge */}
            <div className="h-6 w-16 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full"></div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <div className="h-9 w-20 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg"></div>
              <div className="h-9 w-20 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading