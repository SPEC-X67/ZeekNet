import { BlockUserRequestDto } from 'src/application/dtos/user.dto';

export interface IBlockUserUseCase {
  execute(params: BlockUserRequestDto): Promise<void>;
}
