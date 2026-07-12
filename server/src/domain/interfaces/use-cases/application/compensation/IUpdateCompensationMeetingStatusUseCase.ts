import { UpdateCompensationMeetingStatusRequestDto, ATSCompensationMeetingResponseDto } from 'src/application/dtos/ats-compensation-meeting.dto';

export interface IUpdateCompensationMeetingStatusUseCase {
  execute(dto: UpdateCompensationMeetingStatusRequestDto): Promise<ATSCompensationMeetingResponseDto>;
}

