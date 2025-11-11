import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-slate-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <ApperIcon name="UserX" className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Contact Not Found
        </h1>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist. Let's get you back to your contacts.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
            className="w-full button-click focus-ring"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Contact Hub
          </Button>
          
          <Button
            variant="ghost"
            size="md"
            onClick={() => window.history.back()}
            className="w-full button-click"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-3">Need help?</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a 
              href="mailto:support@contacthub.com" 
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Contact Support
            </a>
            <span className="text-slate-300">•</span>
            <button 
              onClick={() => window.location.reload()}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound