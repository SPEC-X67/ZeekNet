import { Request } from 'express';
import { ValidationError } from '../../domain/errors/errors';
import { IS3Service } from '../../domain/interfaces';
import { FileValidationService } from './file-validation.service';

export class SingleFileUploadService {
  static async handleFileUpload(req: Request, s3Service: IS3Service, fieldName: string = 'file'): Promise<{ url: string; filename: string }> {
    const file = req.file;

    if (!file) {
      throw new ValidationError(`No ${fieldName} uploaded`);
    }

    const { buffer, originalname, mimetype } = file;

    FileValidationService.validateFileType(mimetype, originalname);

    const imageUrl = await s3Service.uploadImage(buffer, originalname, mimetype);

    return {
      url: imageUrl,
      filename: originalname,
    };
  }

  static extractFileInfo(
    req: Request,
    fieldName: string = 'file'
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
}
