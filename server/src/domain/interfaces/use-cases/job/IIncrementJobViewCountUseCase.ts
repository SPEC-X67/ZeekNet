import { IncrementJobViewCountDto } from 'src/application/dtos/job-posting.dto';;

export interface IIncrementJobViewCountUseCase {
  execute(dto: IncrementJobViewCountDto): Promise<void>;
}
