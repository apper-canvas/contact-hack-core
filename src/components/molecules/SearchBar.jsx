import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const SearchBar = ({ 
  value = "", 
  onChange = () => {}, 
  placeholder = "Search contacts...", 
  className = "",
  onClear = () => {}
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-5 w-5 text-slate-400" />
      </div>
      
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-10 h-12 text-base bg-white border-slate-200 shadow-sm hover:shadow-md focus:shadow-md transition-shadow duration-200"
      />
      
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
          type="button"
        >
          <ApperIcon name="X" className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

export default SearchBar