import { injectable, inject } from 'inversify';
import { GetAllUsersRequestDto } from '../../dto/admin/user-management.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';
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

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepositoryFull,
    @inject(TYPES.UserMapper)
    private readonly userMapper: UserMapper,
  ) {}

  async execute(options: GetAllUsersRequestDto): Promise<GetAllUsersResult> {
    const convertedOptions = {
      page: parseInt(options.page),
      limit: parseInt(options.limit),
      search: options.search,
      role: options.role,
      isBlocked: options.isBlocked ? options.isBlocked === 'true' : undefined,
    };
    const result = await this.userRepository.findAllUsers(convertedOptions);
    return {
      users: result.users.map(user => this.userMapper.toDto(user)),
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
