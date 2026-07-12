import { CompanyWorkplacePictureResponseDto } from 'src/application/dtos/company-media.dto';

export interface ICreateCompanyWorkplacePictureUseCase {
  execute(data: {
    userId: string;
    pictureUrl: string;
    caption?: string;
  }): Promise<CompanyWorkplacePictureResponseDto>;
}

