import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({
  children,
  className = "",
  label = "",
  error = "",
  required = false,
  placeholder = "Select an option",
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
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "block w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            "transition-colors duration-200 appearance-none bg-white",
            error && "border-red-300 focus:border-red-500 focus:ring-red-500 animate-shake",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center mt-1">
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select