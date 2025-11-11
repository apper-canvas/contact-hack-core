import React, { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import TextArea from "@/components/atoms/TextArea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ContactForm = ({ 
  contact = null, 
  categories = [],
  onSubmit = () => {}, 
  onCancel = () => {},
  loading = false,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    category: "",
    notes: "",
    isFavorite: false
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        company: contact.company || "",
        category: contact.category || "",
        notes: contact.notes || "",
        isFavorite: contact.isFavorite || false
      })
    }
  }, [contact])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.phone = "Either phone or email is required"
      newErrors.email = "Either phone or email is required"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          required
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={errors.name}
          placeholder="Enter full name"
        />

        <Select
          label="Category"
          required
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          error={errors.category}
          placeholder="Select a category"
        >
          {categories.map((category) => (
            <option key={category.Id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          error={errors.phone}
          placeholder="+1 (555) 123-4567"
        />

        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={errors.email}
          placeholder="name@example.com"
        />
      </div>

      <Input
        label="Company"
        value={formData.company}
        onChange={(e) => handleInputChange("company", e.target.value)}
        placeholder="Company name (optional)"
      />

      <TextArea
        label="Notes"
        rows={4}
        value={formData.notes}
        onChange={(e) => handleInputChange("notes", e.target.value)}
        placeholder="Add any additional notes or details about this contact..."
      />

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="favorite"
          checked={formData.isFavorite}
          onChange={(e) => handleInputChange("isFavorite", e.target.checked)}
          className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
        />
        <label htmlFor="favorite" className="text-sm font-medium text-slate-700 flex items-center">
          <ApperIcon name="Heart" className="w-4 h-4 mr-2 text-red-400" />
          Mark as favorite
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="min-w-[100px]"
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              {contact ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <ApperIcon name={contact ? "Save" : "UserPlus"} className="w-4 h-4 mr-2" />
              {contact ? "Update Contact" : "Add Contact"}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm