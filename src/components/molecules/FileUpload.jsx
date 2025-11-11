import React, { useState, useCallback, useRef } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FilePreview from "./FilePreview"
import { useFileUpload } from "@/hooks/useFileUpload"
import { cn } from "@/utils/cn"
import { toast } from "react-toastify"

const FileUpload = ({ 
  contactId = null, 
  initialFiles = [], 
  onFilesChange = () => {},
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedFileTypes = "image/*,.pdf,.doc,.docx,.txt",
  className = ""
}) => {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const {
    files,
    loading,
    error,
    uploadProgress,
    uploadFile,
    removeFile,
    uploadMultipleFiles
  } = useFileUpload(initialFiles)

  // Notify parent component when files change
  React.useEffect(() => {
    onFilesChange(files)
  }, [files, onFilesChange])

  const validateFile = useCallback((file) => {
    if (file.size > maxFileSize) {
      toast.error(`File "${file.name}" is too large. Maximum size is ${Math.round(maxFileSize / (1024 * 1024))}MB`)
      return false
    }

    if (files.length >= maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return false
    }

    return true
  }, [files.length, maxFiles, maxFileSize])

  const handleFileSelect = useCallback(async (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(validateFile)
    
    if (validFiles.length === 0) return

    if (validFiles.length === 1) {
      await uploadFile(validFiles[0], contactId)
    } else {
      await uploadMultipleFiles(validFiles, contactId)
    }
  }, [validateFile, uploadFile, uploadMultipleFiles, contactId])

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles)
    }
  }, [handleFileSelect])

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback((e) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileSelect(selectedFiles)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }, [handleFileSelect])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer",
          isDragging 
            ? "border-primary-500 bg-primary-50 scale-[1.02]" 
            : "border-slate-300 hover:border-primary-400 hover:bg-slate-50",
          loading && "pointer-events-none opacity-60"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes}
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className={cn(
            "w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all duration-200",
            isDragging ? "bg-primary-100 text-primary-600" : "bg-slate-100 text-slate-500"
          )}>
            <ApperIcon 
              name={isDragging ? "Upload" : "CloudUpload"} 
              size={24} 
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-slate-700">
              {isDragging ? "Drop files here" : "Drag and drop files here"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              or{" "}
              <span className="text-primary-600 font-medium">
                click to browse
              </span>
            </p>
          </div>
          
          <div className="text-xs text-slate-400 space-y-1">
            <p>Maximum {maxFiles} files, up to {Math.round(maxFileSize / (1024 * 1024))}MB each</p>
            <p>Supported formats: Images, PDF, DOC, TXT</p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <ApperIcon name="AlertCircle" size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <ApperIcon name="Paperclip" size={16} />
            Attached Files ({files.length})
          </h4>
          
          <div className="space-y-2">
            {files.map((file) => (
              <FilePreview
                key={file.id}
                file={file}
                onRemove={removeFile}
                uploadProgress={uploadProgress[file.id]}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2 text-primary-600">
            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Uploading files...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload