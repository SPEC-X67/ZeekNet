import { CompanyWorkplacePictures } from '../../../entities/company-workplace-pictures.entity';
import { IBaseRepository } from '../IBaseRepository';

export interface ICompanyWorkplacePicturesRepository extends IBaseRepository<CompanyWorkplacePictures> {
  findByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]>;
}
