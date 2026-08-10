import { ScheduleCompensationMeetingRequestDto, ATSCompensationMeetingResponseDto } from 'src/application/dtos/ats-compensation-meeting.dto';

export interface IScheduleCompensationMeetingUseCase {
  execute(dto: ScheduleCompensationMeetingRequestDto): Promise<ATSCompensationMeetingResponseDto>;
}
