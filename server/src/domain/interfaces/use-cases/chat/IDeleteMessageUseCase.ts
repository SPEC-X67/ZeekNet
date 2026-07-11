import { DeleteMessageDto, DeleteMessageResponseDto } from 'src/application/dtos/chat/message.dto';

export interface IDeleteMessageUseCase {
    execute(input: DeleteMessageDto): Promise<DeleteMessageResponseDto | null>;
}
