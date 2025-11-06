import { type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FormField {
  id: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

interface FieldGroup {
  fields: FormField[]
  gridCols?: 1 | 2 | 3 | 4
}

interface BasicFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  isLoading?: boolean
  children: ReactNode
}

interface AdvancedFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  fields?: FormField[]
  fieldGroups?: FieldGroup[]
  onSubmit: () => void
  submitLabel?: string
  cancelLabel?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  children?: ReactNode
}

type FormDialogProps = BasicFormDialogProps | AdvancedFormDialogProps

const isAdvancedFormDialog = (props: FormDialogProps): props is AdvancedFormDialogProps => {
  return 'open' in props && 'onOpenChange' in props
}

const FormDialog = (props: FormDialogProps) => {
  
  if (isAdvancedFormDialog(props)) {
    const {
      open,
      onOpenChange,
      title,
      description,
      fields = [],
      fieldGroups = [],
      onSubmit,
      submitLabel = 'Save',
      cancelLabel = 'Cancel',
      maxWidth = 'md',
      children,
    } = props

    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
    }

    const renderField = (field: FormField) => {
      const commonProps = {
        id: field.id,
        value: field.value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
          field.onChange(e.target.value),
        placeholder: field.placeholder,
      }

      if (field.type === 'textarea') {
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Textarea
              {...commonProps}
              rows={field.rows || 3}
              className="resize-none"
            />
          </div>
        )
      }

      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            {...commonProps}
            type={field.type || 'text'}
          />
        </div>
      )
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`${maxWidthClasses[maxWidth]}`}>
          <DialogHeader>
            <DialogTitle className="!text-lg !font-bold">{title}</DialogTitle>
            {description && <DialogDescription className="!mb-2">{description}</DialogDescription>}
          </DialogHeader>
          
          <div className="space-y-4">
            {children}
            
            {fields.map(renderField)}

            {fieldGroups.map((group, groupIndex) => (
              <div 
                key={groupIndex} 
                className={`grid gap-4 ${
                  group.gridCols === 2 ? 'grid-cols-2' : 
                  group.gridCols === 3 ? 'grid-cols-3' : 
                  group.gridCols === 4 ? 'grid-cols-4' : 
                  'grid-cols-1'
                }`}
              >
                {group.fields.map(renderField)}
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {cancelLabel}
            </Button>
            <Button onClick={onSubmit} className="bg-cyan-600 hover:bg-cyan-700">
              {submitLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const {
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmVariant = 'default',
    isLoading = false,
    children,
  } = props

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {children}
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button 
            onClick={onConfirm} 
            variant={confirmVariant}
            disabled={isLoading}
            className={confirmVariant === 'default' ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
          >
            {isLoading ? 'Loading...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog