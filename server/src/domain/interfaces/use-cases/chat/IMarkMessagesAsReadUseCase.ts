import { MarkMessagesAsReadDto } from 'src/application/dtos/chat/message.dto';
import { ConversationResponseDto } from 'src/application/dtos/chat/conversation.dto';

export interface IMarkMessagesAsReadUseCase {
    execute(input: MarkMessagesAsReadDto): Promise<ConversationResponseDto>;
}
