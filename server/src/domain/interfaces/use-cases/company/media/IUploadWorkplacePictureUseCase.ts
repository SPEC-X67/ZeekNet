import { UploadWorkplacePictureResult, UploadWorkplacePictureDto } from 'src/application/dtos/company-media.dto';

export interface IUploadWorkplacePictureUseCase {
  execute(dto: UploadWorkplacePictureDto): Promise<UploadWorkplacePictureResult>;
}

