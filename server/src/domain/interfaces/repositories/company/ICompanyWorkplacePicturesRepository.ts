import { CompanyWorkplacePictures } from '../../../entities/company-workplace-pictures.entity';
import { IBaseRepository } from '../base.repository';

export interface ICompanyWorkplacePicturesRepository extends IBaseRepository<CompanyWorkplacePictures> {
  findByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]>;
}

