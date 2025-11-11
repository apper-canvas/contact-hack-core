import React from "react"
import ContactCard from "@/components/molecules/ContactCard"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import { cn } from "@/utils/cn"

const ContactList = ({
  contacts = [],
  categories = [],
  loading = false,
  error = "",
  onRetry = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onToggleFavorite = () => {},
  onAddContact = () => {},
  className = ""
}) => {
  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName)
    return category ? category.color : "#64748b"
  }

  if (loading) {
    return <Loading className={className} />
  }

  if (error) {
    return (
      <ErrorView 
        error={error}
        onRetry={onRetry}
        className={className}
      />
    )
  }

  if (contacts.length === 0) {
    return (
      <Empty 
        onAddContact={onAddContact}
        className={className}
      />
    )
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.Id}
          contact={contact}
          categoryColor={getCategoryColor(contact.category)}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default ContactList