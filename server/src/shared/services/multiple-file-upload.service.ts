import { Request } from 'express';
import { ValidationError } from '../../domain/errors/errors';
import { IS3Service } from '../../domain/interfaces';
import { FileValidationService } from './file-validation.service';

export class MultipleFileUploadService {
  static async handleMultipleFileUpload(
    req: Request,
    s3Service: IS3Service,
    fieldName: string = 'files',
  ): Promise<Array<{ url: string; filename: string }>> {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      throw new ValidationError(`No ${fieldName} uploaded`);
    }

    const uploadPromises = files.map(async (file) => {
      const { buffer, originalname, mimetype } = file;
      
      FileValidationService.validateFileType(mimetype, originalname);
      
      const imageUrl = await s3Service.uploadImage(buffer, originalname, mimetype);
      
      return {
        url: imageUrl,
        filename: originalname,
      };
    });

    return Promise.all(uploadPromises);
  }

  static extractMultipleFileInfo(req: Request, fieldName: string = 'files'): Array<{
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    size: number;
  }> {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return [];
    }

    return files.map(file => ({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    }));
  }
}
