import { ICompanyWorkplacePicturesRepository } from '../../../domain/interfaces/repositories';
import { CompanyWorkplacePictures } from '../../../domain/entities/company-workplace-pictures.entity';
import { IGetCompanyWorkplacePictureUseCase } from '../../../domain/interfaces/use-cases';

export class GetCompanyWorkplacePictureUseCase implements IGetCompanyWorkplacePictureUseCase {
  constructor(private readonly _companyWorkplacePicturesRepository: ICompanyWorkplacePicturesRepository) {}

  async executeByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]> {
    return this._companyWorkplacePicturesRepository.findByCompanyId(companyId);
  }

  async executeById(pictureId: string): Promise<CompanyWorkplacePictures | null> {
    return this._companyWorkplacePicturesRepository.findById(pictureId);
  }
}

