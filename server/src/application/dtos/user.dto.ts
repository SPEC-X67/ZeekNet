import { UserResponseSchema, BlockUserRequestSchema, BlockUserSchema, GetAllUsersQuerySchema, GetAllUsersSchema, GetUsersQuerySchema } from 'src/application/validations/user.validation';
import { z } from 'zod';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { SeekerProfileResponseDto } from './seeker-profile.dto';

export type UserResponseDto = z.infer<typeof UserResponseSchema>;
export type BlockUserRequestDto = z.infer<typeof BlockUserRequestSchema>;
export type GetAllUsersQueryDto = z.infer<typeof GetAllUsersQuerySchema>;
export type GetUsersQueryDto = z.infer<typeof GetUsersQuerySchema>;
export interface PaginatedUsersResultDto {
  users: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
