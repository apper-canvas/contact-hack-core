import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  onAddContact = () => {}, 
  className = "",
  title = "No contacts found",
  description = "Get started by adding your first contact"
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[500px] text-center px-6 ${className}`}>
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
            <ApperIcon 
              name="Users" 
              className="w-10 h-10 text-blue-600 empty-illustration" 
            />
          </div>
        </div>
        
        {/* Floating icons */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse-subtle">
          <ApperIcon name="Plus" className="w-4 h-4 text-accent-500" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse-subtle" style={{ animationDelay: "0.5s" }}>
          <ApperIcon name="Heart" className="w-4 h-4 text-red-400" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
        {description}. Start building your contact network and keep all your important connections organized in one place.
      </p>
      
      <Button 
        onClick={onAddContact}
        variant="primary"
        size="lg"
        className="button-click focus-ring"
      >
        <ApperIcon name="UserPlus" className="w-5 h-5 mr-2" />
        Add Your First Contact
      </Button>
      
      <div className="mt-8 grid grid-cols-3 gap-6 max-w-xs text-center">
        <div className="space-y-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Search" className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs text-slate-500">Quick search</p>
        </div>
        <div className="space-y-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Phone" className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xs text-slate-500">One-click call</p>
        </div>
        <div className="space-y-2">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Tags" className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xs text-slate-500">Smart categories</p>
        </div>
      </div>
    </div>
  )
}

export default Empty