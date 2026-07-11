import { DeleteTechnicalTaskRequestDto } from 'src/application/dtos/application/task.dto';

export interface IDeleteTechnicalTaskUseCase {
  execute(data: DeleteTechnicalTaskRequestDto): Promise<void>;
}

