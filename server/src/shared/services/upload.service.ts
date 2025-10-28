import { Request } from 'express';
import { ValidationError } from '../../domain/errors/errors';
import { IS3Service } from '../../domain/interfaces';

export class UploadService {
  
  private static validateFileType(mimetype: string, filename: string): void {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx'];

    const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));

    if (!allowedTypes.includes(mimetype) && !allowedExtensions.includes(fileExtension)) {
      throw new ValidationError(`File type ${mimetype} is not allowed`);
    }
  }

  
  static validateFileSize(fileSize: number, maxSizeInMB: number = 5): void {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (fileSize > maxSizeInBytes) {
      throw new ValidationError(`File size must be less than ${maxSizeInMB}MB`);
    }
  }

  
  static extractFileInfo(
    req: Request,
    fieldName: string = 'file',
  ): {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    size: number;
  } | null {
    const file = req.file;

    if (!file) {
      return null;
    }

    return {
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  
  static extractMultipleFileInfo(
    req: Request,
    fieldName: string = 'files',
  ): Array<{
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    size: number;
  }> {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return [];
    }

    return files.map((file) => ({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    }));
  }

  
  static async handleFileUpload(req: Request, s3Service: IS3Service, fieldName: string = 'file'): Promise<{ url: string; filename: string }> {
    const file = req.file;

    if (!file) {
      throw new ValidationError(`No ${fieldName} uploaded`);
    }

    const { buffer, originalname, mimetype } = file;

    this.validateFileType(mimetype, originalname);

    const imageUrl = await s3Service.uploadImage(buffer, originalname, mimetype);

    return {
      url: imageUrl,
      filename: originalname,
    };
  }

  
  static async handleMultipleFileUpload(req: Request, s3Service: IS3Service, fieldName: string = 'files'): Promise<Array<{ url: string; filename: string }>> {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new ValidationError(`No ${fieldName} uploaded`);
    }

    const uploadPromises = files.map(async (file) => {
      const { buffer, originalname, mimetype } = file;

      this.validateFileType(mimetype, originalname);

      const imageUrl = await s3Service.uploadImage(buffer, originalname, mimetype);

      return {
        url: imageUrl,
        filename: originalname,
      };
    });

    return Promise.all(uploadPromises);
  }

  
  static async handleFileDeletion(imageUrl: string, s3Service: IS3Service): Promise<void> {
    if (!imageUrl) {
      throw new ValidationError('Image URL is required');
    }

    await s3Service.deleteImage(imageUrl);
  }
}
