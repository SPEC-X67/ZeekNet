import { GetMessagesDto, PaginatedMessagesResponseDto } from 'src/application/dtos/chat.dto';

export interface IGetMessagesUseCase {
    execute(input: GetMessagesDto): Promise<PaginatedMessagesResponseDto>;
}
