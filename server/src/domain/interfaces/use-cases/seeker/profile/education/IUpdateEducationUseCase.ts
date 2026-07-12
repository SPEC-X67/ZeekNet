import { EducationResponseDto, UpdateEducationRequestDto } from 'src/application/dtos/seeker-education.dto';

export interface IUpdateEducationUseCase {
  execute(dto: UpdateEducationRequestDto): Promise<EducationResponseDto>;
}

