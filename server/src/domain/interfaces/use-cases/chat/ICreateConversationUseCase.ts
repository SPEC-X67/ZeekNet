import { CreateConversationDto, ConversationResponseDto } from 'src/application/dtos/chat/conversation.dto';

export interface ICreateConversationUseCase {
    execute(input: CreateConversationDto): Promise<ConversationResponseDto>;
}
