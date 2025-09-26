import { injectable, inject } from 'inversify';
import { GetAllUsersRequestDto } from '../../dto/admin/user-management.dto';
import { TYPES } from '../../../infrastructure/di/types';
import { IUserRepositoryFull } from '../../../domain/repositories';
import { UserRole } from '../../../domain/enums/user-role.enum';

interface AdminUserData {
  id: string;
  name: string | undefined;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface GetAllUsersResult {
  users: AdminUserData[];
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
      users: result.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isBlocked: user.isBlocked,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
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
