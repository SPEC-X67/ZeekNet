import { useState, useCallback } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

export const useSimpleForm = <T extends Record<string, unknown>>(
  initialData: T,
  validationSchema?: z.ZodSchema<T>
) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((field: keyof T, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const updateFields = useCallback((updates: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  }, [formData, validationSchema]);

  const submitForm = useCallback(async (
    onSubmit: (data: T) => Promise<unknown>,
    options: {
      showSuccessToast?: boolean;
      successMessage?: string;
      showErrorToast?: boolean;
    } = {}
  ) => {
    const {
      showSuccessToast = true,
      successMessage = 'Operation completed successfully',
      showErrorToast = true,
    } = options;

    if (!validateForm()) {
      if (showErrorToast) {
        toast.error('Validation Error', {
          description: 'Please fix the errors in the form',
          duration: 4000,
        });
      }
      return;
    }

    setLoading(true);

    try {
      const result = await onSubmit(formData);
      
      if (showSuccessToast) {
        toast.success('Success', {
          description: successMessage,
          duration: 3000,
        });
      }
      
      return result;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? (error as { message: string }).message 
        : 'An unexpected error occurred';
      
      if (showErrorToast) {
        toast.error('Error', {
          description: errorMessage,
          duration: 5000,
        });
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  const getFieldError = useCallback((field: keyof T): string | undefined => {
    return errors[field as string];
  }, [errors]);

  const hasFieldError = useCallback((field: keyof T): boolean => {
    return !!errors[field as string];
  }, [errors]);

  return {
    formData,
    loading,
    errors,
    
    updateField,
    updateFields,
    submitForm,
    resetForm,
    validateForm,
    
    getFieldError,
    hasFieldError,
    
    hasErrors: Object.keys(errors).length > 0,
    isDirty: JSON.stringify(formData) !== JSON.stringify(initialData),
  };
};

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = useCallback(async (
    uploadFn: (file: File) => Promise<unknown>,
    file: File,
    options: {
      showSuccessToast?: boolean;
      successMessage?: string;
      showErrorToast?: boolean;
    } = {}
  ) => {
    const {
      showSuccessToast = true,
      successMessage = 'File uploaded successfully',
      showErrorToast = true,
    } = options;

    setUploading(true);
    setUploadError(null);

    try {
      const result = await uploadFn(file);
      
      if (showSuccessToast) {
        toast.success('Success', {
          description: successMessage,
          duration: 3000,
        });
      }
      
      return result;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? (error as { message: string }).message 
        : 'Upload failed';
      setUploadError(errorMessage);
      
      if (showErrorToast) {
        toast.error('Upload Error', {
          description: errorMessage,
          duration: 5000,
        });
      }
      
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploading,
    uploadError,
    uploadFile,
  };
};
