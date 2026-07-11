import { ScheduleCompensationMeetingRequestDto, ATSCompensationMeetingResponseDto } from 'src/application/dtos/application/compensation.dto';

export interface IScheduleCompensationMeetingUseCase {
  execute(dto: ScheduleCompensationMeetingRequestDto): Promise<ATSCompensationMeetingResponseDto>;
}
