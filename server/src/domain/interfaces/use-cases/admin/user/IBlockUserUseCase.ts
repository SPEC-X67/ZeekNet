import { BlockUserRequestDto } from 'src/application/dtos/admin/user/user.dto';

export interface IBlockUserUseCase {
  execute(params: BlockUserRequestDto): Promise<void>;
}
