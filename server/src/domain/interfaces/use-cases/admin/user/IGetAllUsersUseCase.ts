import { GetUsersQueryDto, PaginatedUsersResultDto } from 'src/application/dtos/user.dto';

export interface IGetAllUsersUseCase {
  execute(options: GetUsersQueryDto): Promise<PaginatedUsersResultDto>;
}

