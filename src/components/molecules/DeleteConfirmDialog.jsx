import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const DeleteConfirmDialog = ({ 
  isOpen = false,
  contactName = "",
  onConfirm = () => {},
  onCancel = () => {},
  loading = false,
  className = ""
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className={cn(
        "bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md",
        "transform transition-all duration-200",
        className
      )}>
        <div className="p-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <ApperIcon name="AlertTriangle" className="w-6 h-6 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
            Delete Contact
          </h3>

          {/* Message */}
          <p className="text-slate-600 text-center mb-6 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-slate-900">"{contactName}"</span>? 
            This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button
              variant="danger"
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 ripple"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmDialog