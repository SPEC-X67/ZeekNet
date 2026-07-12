import { UpdateInterviewRequestDto, ATSInterviewResponseDto } from 'src/application/dtos/ats-interview.dto';

export interface IUpdateInterviewUseCase {
  execute(data: UpdateInterviewRequestDto): Promise<ATSInterviewResponseDto>;
}

