import { AddCompensationNoteSchema, InitiateCompensationSchema, UpdateCompensationSchema } from 'src/application/validations/ats-compensation.validation';
import { z } from 'zod';

export type AddCompensationNoteDto = z.infer<typeof AddCompensationNoteSchema>;
export type InitiateCompensationRequestDto = z.infer<typeof InitiateCompensationSchema> & {
  applicationId: string;
  performedBy: string;
};
export type UpdateCompensationRequestDto = z.infer<typeof UpdateCompensationSchema> & {
  applicationId: string;
  performedBy: string;
};
export class ATSCompensationResponseDto {
  constructor(
    public readonly id: string,
    public readonly applicationId: string,
    public readonly candidateExpected: string,
    public readonly benefits: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly companyProposed?: string,
    public readonly finalAgreed?: string,
    public readonly expectedJoining?: Date,
    public readonly approvedAt?: Date,
    public readonly approvedBy?: string,
    public readonly approvedByName?: string,
  ) { }
}
