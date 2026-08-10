import { UpdateCompensationRequestDto, ATSCompensationResponseDto } from 'src/application/dtos/ats-compensation.dto';

export interface IUpdateCompensationUseCase {
  execute(dto: UpdateCompensationRequestDto): Promise<ATSCompensationResponseDto>;
}
