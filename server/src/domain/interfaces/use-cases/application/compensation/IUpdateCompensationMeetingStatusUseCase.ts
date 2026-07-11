import { UpdateCompensationMeetingStatusRequestDto, ATSCompensationMeetingResponseDto } from 'src/application/dtos/application/compensation.dto';

export interface IUpdateCompensationMeetingStatusUseCase {
  execute(dto: UpdateCompensationMeetingStatusRequestDto): Promise<ATSCompensationMeetingResponseDto>;
}

