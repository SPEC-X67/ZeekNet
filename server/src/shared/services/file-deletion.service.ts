import { ValidationError } from '../../domain/errors/errors';
import { IS3Service } from '../../domain/interfaces';

export class FileDeletionService {
  static async handleFileDeletion(imageUrl: string, s3Service: IS3Service): Promise<void> {
    if (!imageUrl) {
      throw new ValidationError('Image URL is required');
    }

    await s3Service.deleteImage(imageUrl);
  }
}
