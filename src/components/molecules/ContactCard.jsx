import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const ContactCard = ({ 
  contact, 
  onEdit = () => {}, 
  onDelete = () => {},
  onToggleFavorite = () => {},
  categoryColor = "#64748b",
  className = ""
}) => {
  const handleCall = () => {
    if (contact.phone) {
      window.open(`tel:${contact.phone}`)
    }
  }

  const handleEmail = () => {
    if (contact.email) {
      window.open(`mailto:${contact.email}`)
    }
  }

  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm border border-slate-100 card-hover transition-all duration-200",
      "hover:shadow-lg hover:border-slate-200",
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-900 truncate mb-1">
            {contact.name}
          </h3>
          {contact.company && (
            <p className="text-sm text-slate-600 truncate">
              {contact.company}
            </p>
          )}
        </div>
        
        <button
          onClick={() => onToggleFavorite(contact.Id)}
          className="ml-3 p-1 rounded-full hover:bg-slate-100 transition-colors duration-200 flex-shrink-0"
        >
          <ApperIcon 
            name={contact.isFavorite ? "Heart" : "Heart"} 
            className={cn(
              "w-5 h-5 transition-colors duration-200",
              contact.isFavorite ? "text-red-500 fill-current" : "text-slate-400 hover:text-red-400"
            )}
          />
        </button>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        {contact.phone && (
          <div className="flex items-center text-sm text-slate-600">
            <ApperIcon name="Phone" className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{contact.phone}</span>
          </div>
        )}
        
        {contact.email && (
          <div className="flex items-center text-sm text-slate-600">
            <ApperIcon name="Mail" className="w-4 h-4 mr-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
      </div>

      {/* Category Badge */}
      {contact.category && (
        <div className="mb-4">
          <Badge 
            color={categoryColor}
            variant="custom"
            size="sm"
            className="capitalize"
          >
            {contact.category}
          </Badge>
        </div>
      )}

      {/* Notes Preview */}
      {contact.notes && (
        <div className="mb-4">
          <p className="text-sm text-slate-500 line-clamp-2">
            {contact.notes}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        {contact.phone && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleCall}
            className="button-click flex-1 min-w-0"
          >
            <ApperIcon name="Phone" className="w-4 h-4 mr-1" />
            Call
          </Button>
        )}
        
        {contact.email && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEmail}
            className="button-click flex-1 min-w-0"
          >
            <ApperIcon name="Mail" className="w-4 h-4 mr-1" />
            Email
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(contact)}
          className="button-click"
        >
          <ApperIcon name="Edit2" className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(contact.Id)}
          className="button-click text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default ContactCard