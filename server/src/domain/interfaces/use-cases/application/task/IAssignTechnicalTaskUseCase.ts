import { AssignTechnicalTaskRequestDto, ATSTechnicalTaskResponseDto } from 'src/application/dtos/application/task.dto';

import { UploadedFile } from 'src/domain/types/common.types';

export interface IAssignTechnicalTaskUseCase {
  execute(dto: AssignTechnicalTaskRequestDto, file?: UploadedFile): Promise<ATSTechnicalTaskResponseDto>;
}
