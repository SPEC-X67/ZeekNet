import { ReopenJobRequestDto } from 'src/application/dtos/job-posting.dto';

export interface IReopenJobUseCase {
    execute(dto: ReopenJobRequestDto): Promise<void>;
}
