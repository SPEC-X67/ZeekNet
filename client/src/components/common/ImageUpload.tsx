import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

const ImageUpload = ({
  value,
  onChange,
  placeholder = "Click to upload or drag and drop",
  className = "",
  maxSize = 5, // 5MB default
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>Image (Optional)</Label>
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${preview ? 'p-2' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-32 max-w-full mx-auto rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
            <div className="text-sm text-gray-600">
              <p className="font-medium">{placeholder}</p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to {maxSize}MB
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </div>
      <Input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  )
}

export default ImageUpload

