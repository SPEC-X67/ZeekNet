import { SendMessageDto } from 'src/application/dtos/chat.dto';
import { SendMessageResponseDto } from 'src/application/dtos/chat.dto';

export interface ISendMessageUseCase {
    execute(input: SendMessageDto): Promise<SendMessageResponseDto>;
}
