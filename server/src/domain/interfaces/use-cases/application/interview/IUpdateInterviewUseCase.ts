import { UpdateInterviewRequestDto, ATSInterviewResponseDto } from 'src/application/dtos/application/interview.dto';

export interface IUpdateInterviewUseCase {
  execute(data: UpdateInterviewRequestDto): Promise<ATSInterviewResponseDto>;
}

