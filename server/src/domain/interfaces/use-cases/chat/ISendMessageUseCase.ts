import { SendMessageDto, SendMessageResponseDto } from 'src/application/dtos/chat/message.dto';

export interface ISendMessageUseCase {
    execute(input: SendMessageDto): Promise<SendMessageResponseDto>;
}
