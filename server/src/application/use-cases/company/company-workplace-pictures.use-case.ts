import { injectable, inject } from 'inversify';
import { ICompanyWorkplacePicturesRepository } from '../../../domain/repositories/company-workplace-pictures.repository';
import { CompanyWorkplacePictures } from '../../../domain/entities/company-workplace-pictures.entity';
import { TYPES } from '../../../infrastructure/di/types';
import { CreateCompanyWorkplacePicturesDto, UpdateCompanyWorkplacePicturesDto } from '../../dto/company/company-workplace-pictures.dto';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class CompanyWorkplacePicturesUseCase {
  constructor(
    @inject(TYPES.CompanyWorkplacePicturesRepository)
    private readonly companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository,
  ) {}

  async createPicture(companyId: string, data: CreateCompanyWorkplacePicturesDto): Promise<CompanyWorkplacePictures> {
    const picture = CompanyWorkplacePictures.create({ ...data, companyId });
    return this.companyWorkplacePicturesRepository.create(picture);
  }

  async getPicturesByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]> {
    return this.companyWorkplacePicturesRepository.findByCompanyId(companyId);
  }

  async getPictureById(pictureId: string): Promise<CompanyWorkplacePictures | null> {
    return this.companyWorkplacePicturesRepository.findById(pictureId);
  }

  async updatePicture(pictureId: string, data: UpdateCompanyWorkplacePicturesDto): Promise<CompanyWorkplacePictures> {
    const existingPicture = await this.companyWorkplacePicturesRepository.findById(pictureId);
    if (!existingPicture) {
      throw new NotFoundError(`Company workplace picture with ID ${pictureId} not found`);
    }
    const updatedPicture = await this.companyWorkplacePicturesRepository.update(pictureId, data);
    if (!updatedPicture) {
      throw new NotFoundError(`Failed to update company workplace picture with ID ${pictureId}`);
    }
    return updatedPicture;
  }

  async deletePicture(pictureId: string): Promise<void> {
    await this.companyWorkplacePicturesRepository.delete(pictureId);
  }
}
