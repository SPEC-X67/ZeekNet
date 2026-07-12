import { DeleteTechnicalTaskRequestDto } from 'src/application/dtos/ats-technical-task.dto';

export interface IDeleteTechnicalTaskUseCase {
  execute(data: DeleteTechnicalTaskRequestDto): Promise<void>;
}

