import React, { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"
import { formatBytes, getFileIcon, isImageFile } from "@/utils/fileUtils"

const FilePreview = ({ 
  file, 
  onRemove, 
  uploadProgress = null,
  loading = false,
  showPreview = true 
}) => {
  const [imageError, setImageError] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const handleRemove = async () => {
    if (confirmingDelete) {
      await onRemove(file.id)
      setConfirmingDelete(false)
    } else {
      setConfirmingDelete(true)
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setConfirmingDelete(false), 3000)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const isUploading = uploadProgress !== null && uploadProgress < 100
  const canShowImagePreview = showPreview && isImageFile(file.type) && !imageError && file.url

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg transition-all duration-200",
      isUploading && "bg-blue-50 border-blue-200",
      confirmingDelete && "bg-red-50 border-red-200"
    )}>
      {/* File Icon/Preview */}
      <div className="flex-shrink-0">
        {canShowImagePreview ? (
          <div className="w-10 h-10 rounded overflow-hidden">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-white border border-slate-200 rounded flex items-center justify-center">
            <ApperIcon 
              name={getFileIcon(file.type)} 
              size={20} 
              className="text-slate-500"
            />
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">
          {file.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500">
            {formatBytes(file.size)}
          </span>
          {file.uploadedAt && (
            <>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                {new Date(file.uploadedAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-blue-600 font-medium">
                Uploading...
              </span>
              <span className="text-xs text-slate-500">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Download/View Button */}
        {file.url && !isUploading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(file.url, '_blank')}
            className="text-slate-500 hover:text-slate-700"
          >
            <ApperIcon name="ExternalLink" size={16} />
          </Button>
        )}

        {/* Remove Button */}
        {!isUploading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={loading}
            className={cn(
              "text-slate-500 hover:text-red-600",
              confirmingDelete && "text-red-600 bg-red-100"
            )}
          >
            <ApperIcon 
              name={confirmingDelete ? "Trash2" : "X"} 
              size={16} 
            />
          </Button>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        )}
      </div>
    </div>
  )
}

export default FilePreview