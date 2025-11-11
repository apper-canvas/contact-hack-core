import { useState, useCallback, useMemo } from "react"
import { toast } from "react-toastify"

export const useFileUpload = (initialFiles = []) => {
  const [files, setFiles] = useState(initialFiles)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploadProgress, setUploadProgress] = useState({})

  // Performance optimization: Use useMemo for existingFiles array to detect actual changes
  // Compare actual file content, not array references using JSON.stringify for deep equality check
  const existingFiles = useMemo(() => {
    return files.map(file => ({
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url,
      uploadedAt: file.uploadedAt
    }))
  }, [JSON.stringify(files.map(f => ({ 
    id: f.id, 
    name: f.name, 
    size: f.size, 
    type: f.type, 
    url: f.url,
    uploadedAt: f.uploadedAt 
  })))])

  const uploadFile = useCallback(async (file, contactId = null) => {
    if (!window.ApperSDK) {
      toast.error("ApperSDK not loaded. Please refresh the page.")
      return null
    }

    setLoading(true)
    setError("")
    
    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    try {
      // Initialize progress tracking
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)
      if (contactId) {
        formData.append('contactId', contactId)
      }
      formData.append('metadata', JSON.stringify({
        originalName: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      }))

      // Simulate upload progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: Math.min((prev[fileId] || 0) + Math.random() * 30, 90)
        }))
      }, 200)

      // Use ApperSDK for file upload (mock implementation)
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      // Simulate API call for file upload
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

      const uploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // In real implementation, this would be the server URL
        uploadedAt: new Date().toISOString(),
        contactId: contactId
      }

      clearInterval(progressInterval)
      setUploadProgress(prev => ({ ...prev, [fileId]: 100 }))

      // Add to files array
      setFiles(prev => [...prev, uploadedFile])
      
      toast.success(`File "${file.name}" uploaded successfully!`)
      return uploadedFile

    } catch (err) {
      console.error("Error uploading file:", err)
      setError(`Failed to upload ${file.name}`)
      toast.error(`Failed to upload ${file.name}`)
      return null
    } finally {
      setLoading(false)
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[fileId]
          return newProgress
        })
      }, 1000)
    }
  }, [])

  const removeFile = useCallback(async (fileId) => {
    setLoading(true)
    setError("")

    try {
      // In real implementation, this would delete from server
      if (window.ApperSDK) {
        const { ApperClient } = window.ApperSDK
        const apperClient = new ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        })
        
        // Simulate API call for file deletion
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      setFiles(prev => prev.filter(file => file.id !== fileId))
      toast.success("File removed successfully!")

    } catch (err) {
      console.error("Error removing file:", err)
      setError("Failed to remove file")
      toast.error("Failed to remove file")
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadMultipleFiles = useCallback(async (fileList, contactId = null) => {
    const uploadPromises = Array.from(fileList).map(file => uploadFile(file, contactId))
    return Promise.all(uploadPromises)
  }, [uploadFile])

  const getFilesByContact = useCallback((contactId) => {
    return files.filter(file => file.contactId === contactId)
  }, [files])

  const clearFiles = useCallback(() => {
    setFiles([])
    setError("")
    setUploadProgress({})
  }, [])

  // Format conversion helpers (API ↔ UI)
  const formatFilesForAPI = useCallback((filesToFormat) => {
    return filesToFormat.map(file => ({
      fileId: file.id,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: file.url,
      uploadTimestamp: file.uploadedAt,
      associatedContactId: file.contactId
    }))
  }, [])

  const formatFilesFromAPI = useCallback((apiFiles) => {
    return apiFiles.map(apiFile => ({
      id: apiFile.fileId,
      name: apiFile.fileName,
      size: apiFile.fileSize,
      type: apiFile.fileType,
      url: apiFile.fileUrl,
      uploadedAt: apiFile.uploadTimestamp,
      contactId: apiFile.associatedContactId
    }))
  }, [])

  return {
    files: existingFiles,
    loading,
    error,
    uploadProgress,
    uploadFile,
    removeFile,
    uploadMultipleFiles,
    getFilesByContact,
    clearFiles,
    formatFilesForAPI,
    formatFilesFromAPI
  }
}