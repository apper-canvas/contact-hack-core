import contactsData from "@/services/mockData/contacts.json"
import categoriesData from "@/services/mockData/categories.json"

// Simulate localStorage persistence
const STORAGE_KEY = "contact_hub_contacts"
const CATEGORIES_STORAGE_KEY = "contact_hub_categories"

// Initialize localStorage if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsData))
  }
  if (!localStorage.getItem(CATEGORIES_STORAGE_KEY)) {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categoriesData))
  }
}

// Get stored contacts or fallback to default data
const getStoredContacts = () => {
  initializeStorage()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : [...contactsData]
  } catch (error) {
    console.error("Error parsing stored contacts:", error)
    return [...contactsData]
  }
}

// Get stored categories or fallback to default data
const getStoredCategories = () => {
  initializeStorage()
  try {
    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : [...categoriesData]
  } catch (error) {
    console.error("Error parsing stored categories:", error)
    return [...categoriesData]
  }
}

// Save contacts to localStorage
const saveContacts = (contacts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  } catch (error) {
    console.error("Error saving contacts to localStorage:", error)
  }
}

// Save categories to localStorage
const saveCategories = (categories) => {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories))
  } catch (error) {
    console.error("Error saving categories to localStorage:", error)
  }
}

export const contactService = {
  // Get all contacts
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...getStoredContacts()]
  },

  // Get contact by ID
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const contacts = getStoredContacts()
    const contact = contacts.find(contact => contact.Id === parseInt(id))
    return contact ? { ...contact } : null
  },

  // Create new contact
  create: async (contactData) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const contacts = getStoredContacts()
    const maxId = Math.max(...contacts.map(contact => contact.Id), 0)
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const updatedContacts = [...contacts, newContact]
    saveContacts(updatedContacts)
    return { ...newContact }
  },

  // Update existing contact
  update: async (id, contactData) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    const contacts = getStoredContacts()
    const index = contacts.findIndex(contact => contact.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Contact not found")
    }
    const updatedContact = {
      ...contacts[index],
      ...contactData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    }
    contacts[index] = updatedContact
    saveContacts(contacts)
    return { ...updatedContact }
  },

  // Delete contact
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const contacts = getStoredContacts()
    const filteredContacts = contacts.filter(contact => contact.Id !== parseInt(id))
    if (filteredContacts.length === contacts.length) {
      throw new Error("Contact not found")
    }
    saveContacts(filteredContacts)
    return true
  },

  // Search contacts
  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    if (!query || query.trim() === "") {
      return [...getStoredContacts()]
    }
    const contacts = getStoredContacts()
    const searchTerm = query.toLowerCase()
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.company.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm)
    )
  },

  // Get contacts by category
  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const contacts = getStoredContacts()
    if (!category || category === "all") {
      return [...contacts]
    }
    return contacts.filter(contact => contact.category === category)
  }
}

export const categoryService = {
  // Get all categories
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...getStoredCategories()]
  },

  // Create new category
  create: async (categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const categories = getStoredCategories()
    const maxId = Math.max(...categories.map(cat => cat.Id), 0)
    const newCategory = {
      ...categoryData,
      Id: maxId + 1
    }
    const updatedCategories = [...categories, newCategory]
    saveCategories(updatedCategories)
    return { ...newCategory }
  }
}