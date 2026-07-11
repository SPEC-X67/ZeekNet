import { IncrementJobViewCountDto } from 'src/application/dtos/job/job.dto';;

export interface IIncrementJobViewCountUseCase {
  execute(dto: IncrementJobViewCountDto): Promise<void>;
}
