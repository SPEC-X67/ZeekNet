import { IUserManagementRepository } from '../../../domain/interfaces/repositories/user/IUserRepository';
import { UserQueryOptions, PaginatedUsers, IGetAllUsersUseCase } from '../../../domain/interfaces/use-cases/IAdminUseCases';
import { UserRole } from '../../../domain/enums/user-role.enum';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly _userRepository: IUserManagementRepository) {}

  async execute(options: UserQueryOptions): Promise<PaginatedUsers> {
    const page = options.page || 1;
    const limit = options.limit || 10;

    const convertedOptions = {
      page,
      limit,
      search: options.search,
      role: options.role as UserRole | undefined,
      isBlocked: options.isBlocked,
      sortBy: options.sortBy,
      sortOrder: options.sortOrder,
    };

    const result = await this._userRepository.findAllUsers(convertedOptions);

    return {
      users: result.users,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}
