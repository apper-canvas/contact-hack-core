import { useState, useEffect, useCallback } from "react"
import { contactService } from "@/services/api/contactService"
import { toast } from "react-toastify"

export const useContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadContacts = useCallback(async () => {
    setLoading(true)
    setError("")
    
    try {
      const data = await contactService.getAll()
      setContacts(data)
    } catch (err) {
      const errorMessage = "Failed to load contacts. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData)
      setContacts(prev => [...prev, newContact])
      toast.success("Contact added successfully!")
      return newContact
    } catch (err) {
      const errorMessage = "Failed to add contact. Please try again."
      toast.error(errorMessage)
      throw err
    }
  }

  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactService.update(id, contactData)
      setContacts(prev => 
        prev.map(contact => 
          contact.Id === parseInt(id) ? updatedContact : contact
        )
      )
      toast.success("Contact updated successfully!")
      return updatedContact
    } catch (err) {
      const errorMessage = "Failed to update contact. Please try again."
      toast.error(errorMessage)
      throw err
    }
  }

  const deleteContact = async (id) => {
    try {
      await contactService.delete(id)
      setContacts(prev => prev.filter(contact => contact.Id !== parseInt(id)))
      toast.success("Contact deleted successfully!")
    } catch (err) {
      const errorMessage = "Failed to delete contact. Please try again."
      toast.error(errorMessage)
      throw err
    }
  }

  const toggleFavorite = async (id) => {
    const contact = contacts.find(c => c.Id === parseInt(id))
    if (!contact) return

    try {
      const updatedContact = await contactService.update(id, {
        ...contact,
        isFavorite: !contact.isFavorite
      })
      
      setContacts(prev => 
        prev.map(c => 
          c.Id === parseInt(id) ? updatedContact : c
        )
      )
      
      toast.success(
        updatedContact.isFavorite 
          ? "Added to favorites!" 
          : "Removed from favorites!"
      )
    } catch (err) {
      toast.error("Failed to update favorite status.")
    }
  }

  const searchContacts = async (query) => {
    if (!query.trim()) {
      return contacts
    }

    try {
      const results = await contactService.search(query)
      return results
    } catch (err) {
      toast.error("Search failed. Please try again.")
      return []
    }
  }

  const getContactsByCategory = async (category) => {
    try {
      const results = await contactService.getByCategory(category)
      return results
    } catch (err) {
      toast.error("Failed to filter contacts by category.")
      return []
    }
  }

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  return {
    contacts,
    loading,
    error,
    loadContacts,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    searchContacts,
    getContactsByCategory
  }
}