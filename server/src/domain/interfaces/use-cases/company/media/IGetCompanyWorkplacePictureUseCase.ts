import { CompanyWorkplacePictureResponseDto } from 'src/application/dtos/company-media.dto';

export interface IGetCompanyWorkplacePictureUseCase {
  execute(data: { userId: string }): Promise<CompanyWorkplacePictureResponseDto[]>;
}
