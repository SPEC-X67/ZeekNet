import { GetUsersQueryDto, PaginatedUsersResultDto } from 'src/application/dtos/admin/user.dto';

export interface IGetAllUsersUseCase {
  execute(options: GetUsersQueryDto): Promise<PaginatedUsersResultDto>;
}

