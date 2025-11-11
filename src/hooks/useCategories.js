import { useState, useEffect, useCallback } from "react"
import { categoryService } from "@/services/api/contactService"
import { toast } from "react-toastify"

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadCategories = useCallback(async () => {
    setLoading(true)
    setError("")
    
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      const errorMessage = "Failed to load categories."
      setError(errorMessage)
      console.error("Error loading categories:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData)
      setCategories(prev => [...prev, newCategory])
      toast.success("Category created successfully!")
      return newCategory
    } catch (err) {
      const errorMessage = "Failed to create category."
      toast.error(errorMessage)
      throw err
    }
  }

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory
  }
}