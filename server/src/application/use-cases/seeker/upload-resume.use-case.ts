import { ISeekerProfileRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { IUploadResumeUseCase } from '../../../domain/interfaces/use-cases/ISeekerUseCases';
import { ResumeMeta } from '../../../domain/entities/seeker-profile.entity';
import { NotFoundError, ValidationError } from '../../../domain/errors/errors';
import { SeekerProfileMapper } from '../../mappers/seeker-profile.mapper';
import { ResumeMetaResponseDto } from '../../dto/seeker/seeker-profile-response.dto';

export class UploadResumeUseCase implements IUploadResumeUseCase {
  constructor(
    private readonly _seekerProfileRepository: ISeekerProfileRepository,
  ) {}

  async execute(userId: string, resume: ResumeMeta): Promise<ResumeMetaResponseDto> {
    // Verify profile exists
    const profile = await this._seekerProfileRepository.getProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundError('Seeker profile not found');
    }

    // Validate file type (should be PDF, DOC, or DOCX)
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = resume.fileName.toLowerCase().substring(resume.fileName.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) {
      throw new ValidationError('Resume must be a PDF, DOC, or DOCX file');
    }

    const updatedResume = await this._seekerProfileRepository.updateResume(userId, resume);
    return SeekerProfileMapper.resumeMetaToDto(updatedResume);
  }
}
