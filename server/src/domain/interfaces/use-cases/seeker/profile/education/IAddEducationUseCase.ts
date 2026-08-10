import { EducationResponseDto, AddEducationRequestDto } from 'src/application/dtos/seeker-education.dto';

export interface IAddEducationUseCase {
  execute(userId: string, dto: AddEducationRequestDto): Promise<EducationResponseDto>;
}

