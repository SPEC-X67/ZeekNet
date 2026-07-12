
import { DeleteCompanyJobPostingDto } from 'src/application/dtos/job-posting.dto';

export interface IDeleteJobPostingUseCase {
  execute(dto: DeleteCompanyJobPostingDto): Promise<void>;
}
