import { Request } from 'express';
import { ValidationError } from '../../domain/errors/errors';
import { IS3Service } from '../../domain/interfaces';
import { SingleFileUploadService } from './single-file-upload.service';
import { MultipleFileUploadService } from './multiple-file-upload.service';
import { FileDeletionService } from './file-deletion.service';
import { FileValidationService } from './file-validation.service';

export class UploadService {
  static async handleFileUpload(
    req: Request,
    s3Service: IS3Service,
    fieldName: string = 'file',
  ): Promise<{ url: string; filename: string }> {
    return SingleFileUploadService.handleFileUpload(req, s3Service, fieldName);
  }

  static async handleMultipleFileUpload(
    req: Request,
    s3Service: IS3Service,
    fieldName: string = 'files',
  ): Promise<Array<{ url: string; filename: string }>> {
    return MultipleFileUploadService.handleMultipleFileUpload(req, s3Service, fieldName);
  }

  static async handleFileDeletion(
    imageUrl: string,
    s3Service: IS3Service,
  ): Promise<void> {
    return FileDeletionService.handleFileDeletion(imageUrl, s3Service);
  }

  static validateFileSize(fileSize: number, maxSizeInMB: number = 5): void {
    FileValidationService.validateFileSize(fileSize, maxSizeInMB);
  }

  static extractFileInfo(req: Request, fieldName: string = 'file'): {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    size: number;
  } | null {
    return SingleFileUploadService.extractFileInfo(req, fieldName);
  }

  static extractMultipleFileInfo(req: Request, fieldName: string = 'files'): Array<{
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    size: number;
  }> {
    return MultipleFileUploadService.extractMultipleFileInfo(req, fieldName);
  }
}
