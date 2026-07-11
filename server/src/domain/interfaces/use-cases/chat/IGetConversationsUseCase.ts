import { GetConversationsDto, PaginatedConversationsResponseDto } from 'src/application/dtos/chat/conversation.dto';

export interface IGetConversationsUseCase {
    execute(input: GetConversationsDto): Promise<PaginatedConversationsResponseDto>;
}
