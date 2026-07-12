import { z } from 'zod';

export const UploadAvatarSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  fileBuffer: z.instanceof(Buffer, { message: 'File buffer is required' }),
  fileName: z.string().min(1, 'File name is required'),
  mimeType: z.string().min(1, 'MIME type is required'),
});

export const UploadBannerSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  fileBuffer: z.instanceof(Buffer, { message: 'File buffer is required' }),
  fileName: z.string().min(1, 'File name is required'),
  mimeType: z.string().min(1, 'MIME type is required'),
});

export const UploadResumeRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  url: z.string().min(1, 'Resume URL is required'),
  fileName: z.string().min(1, 'File name is required'),
});
