import { ScheduleInterviewRequestDto, ATSInterviewResponseDto } from 'src/application/dtos/ats-interview.dto';

export interface IScheduleInterviewUseCase {
  execute(data: ScheduleInterviewRequestDto): Promise<ATSInterviewResponseDto>;
}
