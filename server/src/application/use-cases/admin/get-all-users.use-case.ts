import { GetAllUsersRequestDto } from '../../dto/admin/user-management.dto';
import { IUserManagementRepository } from '../../../domain/interfaces/repositories';
import { IGetAllUsersUseCase } from '../../../domain/interfaces/use-cases';
import { UserMapper } from '../../mappers/user.mapper';
import { UserResponseDto } from '../../mappers/types';

interface GetAllUsersResult {
  users: UserResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
      private readonly _userRepository: IUserManagementRepository,
    private readonly _userMapper: UserMapper,
  ) {}

  async execute(options: GetAllUsersRequestDto): Promise<GetAllUsersResult> {
    const convertedOptions = {
      page: parseInt(options.page),
      limit: parseInt(options.limit),
      search: options.search,
      role: options.role,
      isBlocked: options.isBlocked ? options.isBlocked === 'true' : undefined,
    };
    const result = await this._userRepository.findAllUsers(convertedOptions);
    return {
      users: result.users.map(user => this._userMapper.toDto(user)),
      pagination: {
        page: convertedOptions.page,
        limit: convertedOptions.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / convertedOptions.limit),
        hasNext: convertedOptions.page * convertedOptions.limit < result.total,
        hasPrev: convertedOptions.page > 1,
      },
    };
  }
}
