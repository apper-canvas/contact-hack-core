import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const TextArea = forwardRef(({
  className = "",
  label = "",
  error = "",
  required = false,
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
          "transition-colors duration-200 resize-vertical",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500 animate-shake",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center mt-1">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

TextArea.displayName = "TextArea"

export default TextArea