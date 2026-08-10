import { ATSTechnicalTaskResponseDto } from 'src/application/dtos/ats-technical-task.dto';

export interface IGetTechnicalTasksByApplicationUseCase {
  execute(applicationId: string): Promise<ATSTechnicalTaskResponseDto[]>;
}

