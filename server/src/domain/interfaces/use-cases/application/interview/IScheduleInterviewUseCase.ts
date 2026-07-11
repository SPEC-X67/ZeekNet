import { ScheduleInterviewRequestDto, ATSInterviewResponseDto } from 'src/application/dtos/application/interview.dto';

export interface IScheduleInterviewUseCase {
  execute(data: ScheduleInterviewRequestDto): Promise<ATSInterviewResponseDto>;
}
