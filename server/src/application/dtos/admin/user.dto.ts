import { z } from 'zod';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { UserResponseDto } from 'src/application/dtos/auth/user/user-response.dto';

// requests/block-user-request.dto.ts
export const BlockUserRequestDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  isBlocked: z.boolean(),
});
export type BlockUserRequestDto = z.infer<typeof BlockUserRequestDtoSchema>;
export const BlockUserDto = BlockUserRequestDtoSchema;

// requests/get-all-users-query.dto.ts
export const GetAllUsersQueryDtoSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isBlocked: z.preprocess(
    (val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      if (typeof val === 'boolean') return val;
      return undefined;
    },
    z.boolean().optional(),
  ),
});
export type GetAllUsersQueryDto = z.infer<typeof GetAllUsersQueryDtoSchema>;
export const GetAllUsersDto = GetAllUsersQueryDtoSchema;

// requests/get-users-query.dto.ts
export const GetUsersQueryDtoSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
  search: z.string().optional(),
  role: z.string().optional(),
  isBlocked: z.coerce.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
export type GetUsersQueryDto = z.infer<typeof GetUsersQueryDtoSchema>;

// responses/paginated-users-result.dto.ts
export interface PaginatedUsersResultDto {
  users: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
