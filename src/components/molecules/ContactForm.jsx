import React, { useEffect, useState } from "react";
import FileUpload from "@/components/molecules/FileUpload";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";

const ContactForm = ({ 
  contact = null, 
  categories = [], 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name_c: "",
    phone_c: "",
    email_c: "",
    company_c: "",
    category_c: "",
    notes_c: "",
    isFavorite_c: false,
    attachments: []
  })
  
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)

  // Initialize form data when contact prop changes
  useEffect(() => {
    if (contact) {
      setFormData({
        name_c: contact.name_c || "",
        phone_c: contact.phone_c || "",
        email_c: contact.email_c || "",
        company_c: contact.company_c || "",
        category_c: contact.category_c?.Id || "",
        notes_c: contact.notes_c || "",
        isFavorite_c: contact.isFavorite_c || false,
        attachments: contact.attachments || []
      })
    } else {
      setFormData({
        name_c: "",
        phone_c: "",
        email_c: "",
        company_c: "",
        category_c: "",
        notes_c: "",
        isFavorite_c: false,
        attachments: []
      })
    }
  }, [contact])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleFilesChange = (files) => {
    setFormData(prev => ({
      ...prev,
      attachments: files
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name_c.trim()) {
      newErrors.name_c = "Name is required"
    }
    
    if (formData.email_c && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address"
    }
    
    if (formData.phone_c && !/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone_c.replace(/\s/g, ''))) {
      newErrors.phone_c = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting")
      return
    }

    setSubmitting(true)
    
    try {
      // Convert category_c to integer if it exists
      const submitData = {
        ...formData,
        category_c: formData.category_c ? parseInt(formData.category_c) : null
      }
      
      await onSubmit(submitData)
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to save contact. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const categoryOptions = [
    { value: "", label: "Select a category..." },
    ...categories.map(cat => ({
      value: cat.Id.toString(),
      label: cat.Name || cat.name_c
    }))
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <ApperIcon name="User" size={20} />
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.name_c}
            onChange={(e) => handleInputChange('name_c', e.target.value)}
            error={errors.name_c}
            placeholder="Enter full name"
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone_c}
            onChange={(e) => handleInputChange('phone_c', e.target.value)}
            error={errors.phone_c}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={formData.email_c}
            onChange={(e) => handleInputChange('email_c', e.target.value)}
            error={errors.email_c}
            placeholder="contact@example.com"
          />
          
          <Input
            label="Company"
            value={formData.company_c}
            onChange={(e) => handleInputChange('company_c', e.target.value)}
            placeholder="Company name"
          />
        </div>
        
        <Select
          label="Category"
          value={formData.category_c}
          onChange={(e) => handleInputChange('category_c', e.target.value)}
          options={categoryOptions}
        />
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <ApperIcon name="FileText" size={20} />
          Additional Details
        </h3>
        
        <TextArea
          label="Notes"
          value={formData.notes_c}
          onChange={(e) => handleInputChange('notes_c', e.target.value)}
          placeholder="Add any additional notes about this contact..."
          rows={4}
        />
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isFavorite"
            checked={formData.isFavorite_c}
            onChange={(e) => handleInputChange('isFavorite_c', e.target.checked)}
            className="w-4 h-4 text-primary-600 bg-slate-100 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label htmlFor="isFavorite" className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <ApperIcon name="Star" size={16} />
            Mark as favorite
          </label>
        </div>
      </div>

      {/* File Attachments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <ApperIcon name="Paperclip" size={20} />
            Attachments
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowFileUpload(!showFileUpload)}
            className="text-sm"
          >
            <ApperIcon name={showFileUpload ? "ChevronUp" : "ChevronDown"} size={16} />
            {showFileUpload ? "Hide" : "Add"} Files
          </Button>
        </div>
        
        {showFileUpload && (
          <FileUpload
            contactId={contact?.Id}
            initialFiles={formData.attachments}
            onFilesChange={handleFilesChange}
            maxFiles={5}
            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
          />
        )}
        
        {formData.attachments.length > 0 && !showFileUpload && (
          <div className="text-sm text-slate-600 flex items-center gap-2">
            <ApperIcon name="Paperclip" size={14} />
            {formData.attachments.length} file{formData.attachments.length !== 1 ? 's' : ''} attached
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting || loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting || loading}
          className="min-w-[120px]"
        >
          {submitting || loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            <>
              <ApperIcon name="Save" size={16} />
              {contact ? "Update Contact" : "Add Contact"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm