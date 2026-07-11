import { GetMessagesDto, PaginatedMessagesResponseDto } from 'src/application/dtos/chat/message.dto';

export interface IGetMessagesUseCase {
    execute(input: GetMessagesDto): Promise<PaginatedMessagesResponseDto>;
}
