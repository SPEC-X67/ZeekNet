import { ATSCompensationMeetingResponseDto } from 'src/application/dtos/application/compensation.dto';

export interface IGetCompensationMeetingsUseCase {
  execute(applicationId: string): Promise<ATSCompensationMeetingResponseDto[]>;
}

