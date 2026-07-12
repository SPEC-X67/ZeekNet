import { EducationResponseDto } from 'src/application/dtos/seeker-education.dto';

export interface IGetEducationUseCase {
  execute(userId: string): Promise<EducationResponseDto[]>;
}

