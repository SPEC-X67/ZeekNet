import { z } from 'zod';

// requests/create-conversation-request.dto.ts
export const CreateConversationRequestDtoSchema = z.object({
  participantId: z.string().min(1, 'participantId is required'),
});
export type CreateConversationRequestDto = z.infer<typeof CreateConversationRequestDtoSchema>;

// requests/create-conversation.dto.ts
export const CreateConversationDtoSchema = z.object({
  creatorId: z.string().min(1, 'Creator ID is required'),
  participantId: z.string().min(1, 'Participant ID is required'),
});
export const CreateConversationDto = CreateConversationRequestDtoSchema;
export type CreateConversationDto = z.infer<typeof CreateConversationDtoSchema>;

// requests/get-conversations-request.dto.ts
export const GetConversationsRequestDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type GetConversationsRequestDto = z.infer<typeof GetConversationsRequestDtoSchema>;

// requests/get-conversations.dto.ts
export const GetConversationsDtoSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});
export type GetConversationsDto = z.infer<typeof GetConversationsDtoSchema>;

// responses/conversation-response.dto.ts
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

// responses/paginated-conversations-response.dto.ts
export interface PaginatedConversationsResponseDto {
  data: ConversationResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
