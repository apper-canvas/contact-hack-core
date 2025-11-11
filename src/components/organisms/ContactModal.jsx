import React from "react"
import ContactForm from "@/components/molecules/ContactForm"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ContactModal = ({
  isOpen = false,
  contact = null,
  categories = [],
  onSubmit = () => {},
  onClose = () => {},
  loading = false,
  className = ""
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 modal-backdrop">
        <div className={cn(
          "bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden",
          "transform transition-all duration-300",
          className
        )}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900">
              {contact ? "Edit Contact" : "Add New Contact"}
            </h2>
            
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <ContactForm
              contact={contact}
              categories={categories}
              onSubmit={onSubmit}
              onCancel={onClose}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal