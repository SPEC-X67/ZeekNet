import { ATSCompensationMeetingResponseDto } from 'src/application/dtos/ats-compensation-meeting.dto';

export interface IGetCompensationMeetingsUseCase {
  execute(applicationId: string): Promise<ATSCompensationMeetingResponseDto[]>;
}

