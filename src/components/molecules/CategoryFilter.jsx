import React from "react"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const CategoryFilter = ({ 
  categories = [], 
  activeCategory = "all", 
  onCategoryChange = () => {},
  contactCounts = {},
  className = ""
}) => {
  const allCount = Object.values(contactCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "transition-all duration-200 hover:scale-105",
          activeCategory === "all" && "ring-2 ring-primary-300 ring-offset-2"
        )}
      >
        <Badge 
          variant={activeCategory === "all" ? "primary" : "default"}
          size="md"
          className="cursor-pointer"
        >
          All ({allCount})
        </Badge>
      </button>
      
      {categories.map((category) => (
        <button
          key={category.Id}
          onClick={() => onCategoryChange(category.name)}
          className={cn(
            "transition-all duration-200 hover:scale-105",
            activeCategory === category.name && "ring-2 ring-offset-2"
          )}
          style={{
            '--ring-color': `${category.color}50`
          }}
        >
          <Badge 
            color={activeCategory === category.name ? category.color : undefined}
            variant={activeCategory === category.name ? "custom" : "default"}
            size="md"
            className="cursor-pointer"
          >
            {category.name} ({contactCounts[category.name] || 0})
          </Badge>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter