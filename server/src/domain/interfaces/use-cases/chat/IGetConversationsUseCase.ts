import { GetConversationsDto, PaginatedConversationsResponseDto } from 'src/application/dtos/chat.dto';

export interface IGetConversationsUseCase {
    execute(input: GetConversationsDto): Promise<PaginatedConversationsResponseDto>;
}
