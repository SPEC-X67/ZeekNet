import { z } from 'zod';

export const CreateConversationRequestSchema = z.object({
  participantId: z.string().min(1, 'participantId is required'),
});

export const CreateConversationSchema = z.object({
  creatorId: z.string().min(1, 'Creator ID is required'),
  participantId: z.string().min(1, 'Participant ID is required'),
});

export const GetConversationsRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const GetConversationsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const DeleteMessageSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  messageId: z.string().min(1, 'Message ID is required'),
});

export const GetMessagesRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export const GetMessagesSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(200).default(50),
});

export const MarkMessagesAsReadSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
});

export const SendMessageRequestSchema = z.object({
  receiverId: z.string().min(1, 'Receiver ID is required'),
  content: z.string().trim().min(1, 'Message content is required').max(2000, 'Message is too long'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  replyToMessageId: z.string().optional(),
});

export const SendMessageSchema = z.object({
  senderId: z.string().min(1, 'Sender ID is required'),
  receiverId: z.string().min(1, 'Receiver ID is required'),
  content: z.string().trim().min(1, 'Message content is required').max(2000, 'Message is too long'),
  conversationId: z.string().min(1, 'Conversation ID is required'),
  replyToMessageId: z.string().optional(),
});
