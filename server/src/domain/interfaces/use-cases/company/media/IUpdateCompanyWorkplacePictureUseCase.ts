import { CompanyWorkplacePictureResponseDto } from 'src/application/dtos/company-media.dto';

export interface IUpdateCompanyWorkplacePictureUseCase {
  execute(data: {
    userId: string;
    pictureId: string;
    pictureUrl: string;
    caption?: string;
  }): Promise<CompanyWorkplacePictureResponseDto>;
}

