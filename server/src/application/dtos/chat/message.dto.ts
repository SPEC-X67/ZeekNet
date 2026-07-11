import { z } from 'zod';
import { ConversationResponseDto } from 'src/application/dtos/chat/conversation.dto';

// requests/delete-message.dto.ts
export const DeleteMessageDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  messageId: z.string().min(1, 'Message ID is required'),
});
export type DeleteMessageDto = z.infer<typeof DeleteMessageDtoSchema>;

// requests/get-messages-request.dto.ts
export const GetMessagesRequestDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});
export type GetMessagesRequestDto = z.infer<typeof GetMessagesRequestDtoSchema>;

// requests/get-messages.dto.ts
export const GetMessagesDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(200).default(50),
});
export type GetMessagesDto = z.infer<typeof GetMessagesDtoSchema>;

// requests/mark-messages-as-read.dto.ts
export const MarkMessagesAsReadDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
});
export type MarkMessagesAsReadDto = z.infer<typeof MarkMessagesAsReadDtoSchema>;

// requests/send-message-request.dto.ts
export const SendMessageRequestDtoSchema = z.object({
  receiverId: z.string().min(1, 'Receiver ID is required'),
  content: z.string().trim().min(1, 'Message content is required').max(2000, 'Message is too long'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  replyToMessageId: z.string().optional(),
});
export type SendMessageRequestDto = z.infer<typeof SendMessageRequestDtoSchema>;
export const SendMessageDto = SendMessageRequestDtoSchema;

// requests/send-message.dto.ts
// This is the DTO that the Use Case receives (includes senderId from auth)
export const SendMessageDtoSchema = z.object({
  senderId: z.string().min(1, 'Sender ID is required'),
  receiverId: z.string().min(1, 'Receiver ID is required'),
  content: z.string().trim().min(1, 'Message content is required').max(2000, 'Message is too long'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  replyToMessageId: z.string().optional(),
});
export type SendMessageDto = z.infer<typeof SendMessageDtoSchema>;

// responses/chat-message-response.dto.ts
export interface ChatMessageResponseDto {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  readAt?: Date | null;
  replyToMessageId?: string | null;
  replyToMessage?: {
    id: string;
    content: string;
    senderId: string;
  } | null;
}

// responses/paginated-messages-response.dto.ts
export interface PaginatedMessagesResponseDto {
  data: ChatMessageResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// responses/send-message-response.dto.ts
export interface SendMessageResponseDto {
  conversation: ConversationResponseDto;
  message: ChatMessageResponseDto;
}

// responses/delete-message-response.dto.ts
export interface DeleteMessageResponseDto {
  message: ChatMessageResponseDto;
  conversation: ConversationResponseDto | null;
}
