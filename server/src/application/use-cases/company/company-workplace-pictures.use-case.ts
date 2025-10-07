import { ICompanyWorkplacePicturesRepository } from '../../../domain/interfaces/repositories/company-workplace-pictures.repository';
import { CompanyWorkplacePictures } from '../../../domain/entities/company-workplace-pictures.entity';
import { CreateCompanyWorkplacePicturesDto, UpdateCompanyWorkplacePicturesDto } from '../../dto/company/company-workplace-pictures.dto';
import { NotFoundError } from '../../../domain/errors/errors';

export class CompanyWorkplacePicturesUseCase {
  constructor(
    private readonly _companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository,
  ) {}

  async createPicture(companyId: string, data: CreateCompanyWorkplacePicturesDto): Promise<CompanyWorkplacePictures> {
    const picture = CompanyWorkplacePictures.create({ ...data, companyId });
    return this._companyWorkplacePicturesRepository.create(picture);
  }

  async getPicturesByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]> {
    return this._companyWorkplacePicturesRepository.findByCompanyId(companyId);
  }

  async getPictureById(pictureId: string): Promise<CompanyWorkplacePictures | null> {
    return this._companyWorkplacePicturesRepository.findById(pictureId);
  }

  async updatePicture(pictureId: string, data: UpdateCompanyWorkplacePicturesDto): Promise<CompanyWorkplacePictures> {
    const existingPicture = await this._companyWorkplacePicturesRepository.findById(pictureId);
    if (!existingPicture) {
      throw new NotFoundError(`Company workplace picture with ID ${pictureId} not found`);
    }
    const updatedPicture = await this._companyWorkplacePicturesRepository.update(pictureId, data);
    if (!updatedPicture) {
      throw new NotFoundError(`Failed to update company workplace picture with ID ${pictureId}`);
    }
    return updatedPicture;
  }

  async deletePicture(pictureId: string): Promise<void> {
    await this._companyWorkplacePicturesRepository.delete(pictureId);
  }
}
