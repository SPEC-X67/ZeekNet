import { CreateConversationDto } from 'src/application/dtos/chat.dto';
import { ConversationResponseDto } from 'src/application/dtos/chat.dto';

export interface ICreateConversationUseCase {
    execute(input: CreateConversationDto): Promise<ConversationResponseDto>;
}
