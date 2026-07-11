import { ATSTechnicalTaskResponseDto } from 'src/application/dtos/application/task.dto';

export interface IGetTechnicalTasksByApplicationUseCase {
  execute(applicationId: string): Promise<ATSTechnicalTaskResponseDto[]>;
}

