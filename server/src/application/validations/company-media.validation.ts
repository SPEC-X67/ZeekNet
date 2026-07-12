import { z } from 'zod';

export const CreateCompanyWorkplacePicturesSchema = z.object({
  pictureUrl: z.string().min(1, 'Picture URL is required'),
  caption: z.string().optional(),
});
export const UpdateCompanyWorkplacePicturesSchema = z.object({
  pictureUrl: z.string().min(1, 'Picture URL is required'),
  caption: z.string().optional(),
});
export const DeleteImageSchema = z.object({
  imageUrl: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
});
export const UploadBusinessLicenseSchema = z.object({
  buffer: z.instanceof(Buffer, { message: 'File buffer is required' }),
  originalname: z.string().min(1, 'Original file name is required'),
  mimetype: z.string().min(1, 'MIME type is required'),
});
export const UploadLogoSchema = z.object({
  buffer: z.instanceof(Buffer, { message: 'File buffer is required' }),
  originalname: z.string().min(1, 'File name is required'),
  mimetype: z.string().min(1, 'MIME type is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const UploadWorkplacePictureSchema = z.object({
  buffer: z.instanceof(Buffer, { message: 'File buffer is required' }),
  originalname: z.string().min(1, 'Original file name is required'),
  mimetype: z.string().min(1, 'MIME type is required'),
});
