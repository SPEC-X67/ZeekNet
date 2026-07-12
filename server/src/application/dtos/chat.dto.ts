import { z } from 'zod';
import {
  CreateConversationRequestSchema,
  CreateConversationSchema,
  GetConversationsRequestSchema,
  GetConversationsSchema,
  DeleteMessageSchema,
  GetMessagesRequestSchema,
  GetMessagesSchema,
  MarkMessagesAsReadSchema,
  SendMessageRequestSchema,
  SendMessageSchema,
} from 'src/application/validations/chat.validation';

export type CreateConversationRequestDto = z.infer<typeof CreateConversationRequestSchema>;
export type CreateConversationDto = z.infer<typeof CreateConversationSchema>;
export type GetConversationsRequestDto = z.infer<typeof GetConversationsRequestSchema>;
export type GetConversationsDto = z.infer<typeof GetConversationsSchema>;

export interface ConversationParticipantDto {
  userId: string;
  role: string;
  unreadCount: number;
  lastReadAt?: Date | null;
  name: string;
  profileImage: string | null;
}

export interface LastMessageDto {
  messageId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

export interface ConversationResponseDto {
  id: string;
  participants: ConversationParticipantDto[];
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: LastMessageDto | null;
}

export interface PaginatedConversationsResponseDto {
  data: ConversationResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type DeleteMessageDto = z.infer<typeof DeleteMessageSchema>;
export type GetMessagesRequestDto = z.infer<typeof GetMessagesRequestSchema>;
export type GetMessagesDto = z.infer<typeof GetMessagesSchema>;
export type MarkMessagesAsReadDto = z.infer<typeof MarkMessagesAsReadSchema>;
export type SendMessageRequestDto = z.infer<typeof SendMessageRequestSchema>;
export type SendMessageDto = z.infer<typeof SendMessageSchema>;

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

export interface PaginatedMessagesResponseDto {
  data: ChatMessageResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SendMessageResponseDto {
  conversation: ConversationResponseDto;
  message: ChatMessageResponseDto;
}

export interface DeleteMessageResponseDto {
  message: ChatMessageResponseDto;
  conversation: ConversationResponseDto | null;
}
