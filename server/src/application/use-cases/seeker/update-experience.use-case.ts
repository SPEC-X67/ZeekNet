import { ISeekerProfileRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { ISeekerExperienceRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerExperienceRepository';
import { IUpdateExperienceUseCase, UpdateExperienceData } from '../../../domain/interfaces/use-cases/ISeekerUseCases';
import { Experience } from '../../../domain/entities/seeker-profile.entity';
import { NotFoundError, ValidationError } from '../../../domain/errors/errors';
import { SeekerProfileMapper } from '../../mappers/seeker-profile.mapper';
import { ExperienceResponseDto } from '../../dto/seeker/seeker-profile-response.dto';

export class UpdateExperienceUseCase implements IUpdateExperienceUseCase {
  constructor(
    private readonly _seekerProfileRepository: ISeekerProfileRepository,
    private readonly _seekerExperienceRepository: ISeekerExperienceRepository,
  ) {}

  async execute(userId: string, experienceId: string, data: UpdateExperienceData): Promise<ExperienceResponseDto> {
    // Verify profile exists
    const profile = await this._seekerProfileRepository.getProfileByUserId(userId);
    if (!profile) {
      throw new NotFoundError('Seeker profile not found');
    }

    // Get existing experience to validate
    const existingExperience = await this._seekerExperienceRepository.findById(experienceId);
    
    if (!existingExperience) {
      throw new NotFoundError('Experience not found');
    }

    // Verify the experience belongs to this user's profile
    const userExperiences = await this._seekerExperienceRepository.findBySeekerProfileId(profile.id);
    if (!userExperiences.find(exp => exp.id === experienceId)) {
      throw new NotFoundError('Experience not found');
    }

    // Merge with existing data
    const mergedData: Partial<Experience> = {
      ...existingExperience,
      ...data,
    };

    // Validate dates if provided
    const startDate = mergedData.startDate || existingExperience.startDate;
    if (mergedData.endDate && mergedData.endDate < startDate) {
      throw new ValidationError('End date must be after start date');
    }

    // Validate isCurrent flag
    if (mergedData.isCurrent && mergedData.endDate) {
      throw new ValidationError('Current experience cannot have an end date');
    }

    const updatedExperience = await this._seekerExperienceRepository.update(experienceId, data);
    return SeekerProfileMapper.experienceToDto(updatedExperience);
  }
}
