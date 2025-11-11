import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ 
  error = "Something went wrong", 
  onRetry = () => {}, 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] text-center px-6 ${className}`}>
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mb-6">
        <ApperIcon 
          name="AlertCircle" 
          className="w-8 h-8 text-red-500" 
        />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
        {error || "We encountered an error while loading your contacts. Please try again."}
      </p>
      
      <Button 
        onClick={onRetry}
        variant="primary"
        size="md"
        className="button-click focus-ring"
      >
        <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
        Try Again
      </Button>
      
      <div className="mt-8 text-sm text-slate-500">
        If the problem persists, please refresh the page
      </div>
    </div>
  )
}

export default ErrorView