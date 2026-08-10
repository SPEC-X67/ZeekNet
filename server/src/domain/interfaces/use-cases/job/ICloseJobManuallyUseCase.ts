import { CloseJobDto } from 'src/application/dtos/job-posting.dto';

export interface ICloseJobManuallyUseCase {
    execute(dto: CloseJobDto): Promise<void>;
}
