import React from "react"
import SearchBar from "@/components/molecules/SearchBar"
import CategoryFilter from "@/components/molecules/CategoryFilter"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import LogoutButton from "@/components/organisms/LogoutButton"
import { cn } from "@/utils/cn"

const ContactHeader = ({
searchQuery = "",
  onSearchChange = () => {},
  onSearchClear = () => {},
  categories = [],
  activeCategory = "all",
  onCategoryChange = () => {},
  contactCounts = {},
  onAddContact = () => {},
  totalContacts = 0,
  className = ""
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Contact Hub
          </h1>
          <p className="text-slate-600 mt-1">
{totalContacts === 0 
              ? "Start building your contact network" 
              : `Manage your ${totalContacts} contact${totalContacts === 1 ? "" : "s"}`
            }
          </p>
        </div>
        
        <Button
          variant="primary"
          size="lg"
          onClick={onAddContact}
          className="button-click shadow-lg hover:shadow-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
        >
          <ApperIcon name="UserPlus" className="w-5 h-5 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={onSearchClear}
            placeholder="Search by name, email, company, or phone..."
          />
        </div>
        
        <div className="flex-shrink-0">
          <CategoryFilter
categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            contactCounts={contactCounts}
          />
        </div>

        {/* Logout Button */}
        <div className="flex items-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default ContactHeader