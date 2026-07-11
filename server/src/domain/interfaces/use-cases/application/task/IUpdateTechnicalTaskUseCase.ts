import { UpdateTechnicalTaskRequestDto, ATSTechnicalTaskResponseDto } from 'src/application/dtos/application/task.dto';

import { UploadedFile } from 'src/domain/types/common.types';

export interface IUpdateTechnicalTaskUseCase {
  execute(dto: UpdateTechnicalTaskRequestDto, file?: UploadedFile): Promise<ATSTechnicalTaskResponseDto>;
}
