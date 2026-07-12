import { z } from 'zod';

export const AddCompensationNoteSchema = z.object({
  note: z.string().min(1, 'Note cannot be empty'),
});
export const InitiateCompensationSchema = z.object({
  candidateExpected: z.string().min(1, 'Candidate expected compensation is required'),
  notes: z.string().optional(),
});
export const UpdateCompensationSchema = z.object({
  candidateExpected: z.string().optional(),
  companyProposed: z.string().optional(),
  expectedJoining: z.coerce.date().optional(),
  benefits: z.array(z.string()).optional(),
  finalAgreed: z.string().optional(),
  approvedAt: z.coerce.date().optional(),
  approvedBy: z.string().optional(),
  approvedByName: z.string().optional(),
  notes: z.string().optional(),
});
