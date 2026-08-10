import { MarkMessagesAsReadDto } from 'src/application/dtos/chat.dto';
import { ConversationResponseDto } from 'src/application/dtos/chat.dto';

export interface IMarkMessagesAsReadUseCase {
    execute(input: MarkMessagesAsReadDto): Promise<ConversationResponseDto>;
}
