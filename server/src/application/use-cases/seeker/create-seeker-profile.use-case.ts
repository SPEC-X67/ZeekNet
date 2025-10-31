import { ISeekerProfileRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { ICreateSeekerProfileUseCase, CreateSeekerProfileData } from '../../../domain/interfaces/use-cases/ISeekerUseCases';
import { ValidationError } from '../../../domain/errors/errors';
import { SeekerProfileMapper } from '../../mappers/seeker-profile.mapper';
import { SeekerProfileResponseDto } from '../../dto/seeker/seeker-profile-response.dto';

export class CreateSeekerProfileUseCase implements ICreateSeekerProfileUseCase {
  constructor(
    private readonly _seekerProfileRepository: ISeekerProfileRepository,
  ) {}

  async execute(userId: string, data: CreateSeekerProfileData): Promise<SeekerProfileResponseDto> {
    // Check if profile already exists
    const existingProfile = await this._seekerProfileRepository.getProfileByUserId(userId);
    if (existingProfile) {
      throw new ValidationError('Profile already exists. Use update endpoint to modify.');
    }

    // Create the profile
    const profile = await this._seekerProfileRepository.createProfile({
      userId,
      headline: data.headline,
      summary: data.summary,
      location: data.location,
      phone: data.phone,
      email: data.email,
      avatarUrl: data.avatarUrl,
      skills: data.skills || [],
      socialLinks: data.socialLinks,
    });

    return SeekerProfileMapper.toDto(profile);
  }
}
