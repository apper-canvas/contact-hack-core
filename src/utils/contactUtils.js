import { format, isValid, parseISO } from "date-fns"

export const formatContactDate = (dateString) => {
  if (!dateString) return ""
  
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString)
    return isValid(date) ? format(date, "MMM d, yyyy") : ""
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}

export const formatPhoneNumber = (phone) => {
  if (!phone) return ""
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "")
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // Format as +X (XXX) XXX-XXXX for international numbers starting with 1
  if (cleaned.length === 11 && cleaned[0] === "1") {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  // Return original if format doesn"t match
  return phone
}

export const getContactInitials = (name) => {
  if (!name) return "?"
  
  const words = name.trim().split(" ")
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

export const sortContacts = (contacts, sortBy = "name", sortOrder = "asc") => {
  if (!Array.isArray(contacts)) return []
  
  return [...contacts].sort((a, b) => {
    let aValue = a[sortBy] || ""
    let bValue = b[sortBy] || ""
    
    // Handle different data types
    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder === "desc") {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    }
    
    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
  })
}

export const filterContactsByQuery = (contacts, query) => {
  if (!query || !Array.isArray(contacts)) return contacts
  
  const searchTerm = query.toLowerCase().trim()
  
return contacts.filter(contact => 
    contact.name?.toLowerCase().includes(searchTerm) ||
    contact.email?.toLowerCase().includes(searchTerm) ||
    contact.company?.toLowerCase().includes(searchTerm) ||
    contact.phone?.includes(searchTerm) ||
    contact.category?.toLowerCase().includes(searchTerm) ||
    contact.notes?.toLowerCase().includes(searchTerm)
  )
}

export const filterContactsByCategory = (contacts, category) => {
  if (!category || category === "all" || !Array.isArray(contacts)) {
    return contacts
  }
  
return contacts.filter(contact => contact.category === category)
}

export const getContactCounts = (contacts, categories) => {
  if (!Array.isArray(contacts) || !Array.isArray(categories)) {
    return {}
  }
  
  const counts = {}
  
  categories.forEach(category => {
counts[category.name] = contacts.filter(
      contact => contact.category === category.name
    ).length
  })
  
  return counts
}

export const validateEmail = (email) => {
  if (!email) return true // Email is optional
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  if (!phone) return true // Phone is optional if email is provided
  
// Allow various phone number formats
  const phoneRegex = /^[+]?[()]?[\d\s\-()]{10,}$/
  return phoneRegex.test(phone)
}

export const validateContact = (contact) => {
  const errors = {}
  
if (!contact.name?.trim()) {
    errors.name = "Name is required"
  }
  
  if (!contact.phone?.trim() && !contact.email?.trim()) {
    errors.phone = "Either phone or email is required"
    errors.email = "Either phone or email is required"
  }
  
  if (contact.email && !validateEmail(contact.email)) {
    errors.email = "Please enter a valid email address"
  }
  
  if (contact.phone && !validatePhone(contact.phone)) {
    errors.phone = "Please enter a valid phone number"
  }
  
  if (!contact.category) {
    errors.category = "Please select a category"
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}