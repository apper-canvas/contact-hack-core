// File utility functions for file upload functionality

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const isImageFile = (mimeType) => {
  return mimeType.startsWith('image/')
}

export const getFileIcon = (mimeType) => {
  if (isImageFile(mimeType)) return 'Image'
  if (mimeType.includes('pdf')) return 'FileText'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'FileText'
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'Sheet'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'Presentation'
  if (mimeType.includes('video')) return 'Video'
  if (mimeType.includes('audio')) return 'Music'
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) return 'Archive'
  return 'File'
}

export const validateFileType = (file, acceptedTypes = []) => {
  if (acceptedTypes.length === 0) return true
  
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type.toLowerCase())
    }
    if (type.includes('/*')) {
      const baseType = type.split('/')[0]
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })
}

export const getFileExtension = (filename) => {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export const isValidImageFile = (file) => {
  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  return validImageTypes.includes(file.type)
}
export const createFilePreviewUrl = (file) => {
  if (typeof File !== 'undefined' && file instanceof File) {
    return URL.createObjectURL(file)
  }
  return file?.url || null
}
export const revokeFilePreviewUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}