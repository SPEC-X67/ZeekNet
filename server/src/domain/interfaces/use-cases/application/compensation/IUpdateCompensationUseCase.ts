import { UpdateCompensationRequestDto, ATSCompensationResponseDto } from 'src/application/dtos/application/compensation.dto';

export interface IUpdateCompensationUseCase {
  execute(dto: UpdateCompensationRequestDto): Promise<ATSCompensationResponseDto>;
}
