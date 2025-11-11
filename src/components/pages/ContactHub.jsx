import React, { useState, useEffect } from "react"
import ContactHeader from "@/components/organisms/ContactHeader"
import ContactList from "@/components/organisms/ContactList"
import ContactModal from "@/components/organisms/ContactModal"
import DeleteConfirmDialog from "@/components/molecules/DeleteConfirmDialog"
import { useContacts } from "@/hooks/useContacts"
import { useCategories } from "@/hooks/useCategories"
import { filterContactsByQuery, filterContactsByCategory, getContactCounts } from "@/utils/contactUtils"
import { toast } from "react-toastify"

const ContactHub = () => {
  // Hooks
  const {
    contacts,
    loading: contactsLoading,
    error: contactsError,
    loadContacts,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite
  } = useContacts()

  const {
    categories,
    loading: categoriesLoading
  } = useCategories()

// State
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredContacts, setFilteredContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Filter contacts based on search and category
  useEffect(() => {
    let filtered = contacts

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filterContactsByQuery(filtered, searchQuery)
    }

    // Apply category filter
    filtered = filterContactsByCategory(filtered, activeCategory)

    setFilteredContacts(filtered)
  }, [contacts, searchQuery, activeCategory])

  // Handlers
  const handleAddContact = () => {
    setEditingContact(null)
    setIsModalOpen(true)
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingContact(null)
  }

  const handleSubmitContact = async (contactData) => {
    setModalLoading(true)
    
    try {
      if (editingContact) {
        await updateContact(editingContact.Id, contactData)
      } else {
        await createContact(contactData)
      }
      handleCloseModal()
    } catch (error) {
      console.error("Error submitting contact:", error)
    } finally {
      setModalLoading(false)
    }
  }

  const handleDeleteClick = (contactId) => {
    const contact = contacts.find(c => c.Id === contactId)
    if (contact) {
      setContactToDelete(contact)
      setIsDeleteDialogOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return

    setDeleteLoading(true)
    
    try {
      await deleteContact(contactToDelete.Id)
      setIsDeleteDialogOpen(false)
      setContactToDelete(null)
    } catch (error) {
      console.error("Error deleting contact:", error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
    setContactToDelete(null)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleSearchClear = () => {
    setSearchQuery("")
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const handleToggleFavorite = (contactId) => {
    toggleFavorite(contactId)
  }

  const handleRetry = () => {
    loadContacts()
  }

  // Calculate contact counts by category
  const contactCounts = getContactCounts(contacts, categories)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <ContactHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          contactCounts={contactCounts}
          onAddContact={handleAddContact}
          totalContacts={contacts.length}
        />

        <div className="mt-8">
          <ContactList
            contacts={filteredContacts}
            categories={categories}
            loading={contactsLoading}
            error={contactsError}
            onRetry={handleRetry}
            onEdit={handleEditContact}
            onDelete={handleDeleteClick}
            onToggleFavorite={handleToggleFavorite}
            onAddContact={handleAddContact}
          />
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isModalOpen}
          contact={editingContact}
          categories={categories}
          onSubmit={handleSubmitContact}
          onClose={handleCloseModal}
          loading={modalLoading}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          contactName={contactToDelete?.name || ""}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleteLoading}
        />
      </div>
    </div>
  )
}

export default ContactHub