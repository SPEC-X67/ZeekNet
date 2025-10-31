import { ISeekerProfileRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { IUpdateSeekerProfileUseCase, UpdateSeekerProfileData } from '../../../domain/interfaces/use-cases/ISeekerUseCases';
import { IS3Service } from '../../../domain/interfaces/services/IS3Service';
import { SeekerProfile } from '../../../domain/entities/seeker-profile.entity';
import { NotFoundError } from '../../../domain/errors/errors';
import { SeekerProfileMapper } from '../../mappers/seeker-profile.mapper';
import { SeekerProfileResponseDto } from '../../dto/seeker/seeker-profile-response.dto';

export class UpdateSeekerProfileUseCase implements IUpdateSeekerProfileUseCase {
  constructor(
    private readonly _seekerProfileRepository: ISeekerProfileRepository,
    private readonly _s3Service: IS3Service,
  ) {}

  async execute(userId: string, data: UpdateSeekerProfileData): Promise<SeekerProfileResponseDto> {
    const existingProfile = await this._seekerProfileRepository.getProfileByUserId(userId);
    
    if (!existingProfile) {
      throw new NotFoundError('Seeker profile not found');
    }

    const updateData: Record<string, unknown> = {};
    
    if (data.headline !== undefined) updateData.headline = data.headline || null;
    if (data.summary !== undefined) updateData.summary = data.summary || null;
    if (data.location !== undefined) updateData.location = data.location || null;
    if (data.phone !== undefined) updateData.phone = data.phone || null;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.avatarFileName !== undefined) updateData.avatarFileName = data.avatarFileName || null;
    if (data.bannerFileName !== undefined) updateData.bannerFileName = data.bannerFileName || null;
    if (data.skills !== undefined) updateData.skills = data.skills;
    if (data.languages !== undefined) updateData.languages = data.languages || [];
    if (data.socialLinks !== undefined) updateData.socialLinks = data.socialLinks || [];

    const updatedProfile = await this._seekerProfileRepository.updateProfile(existingProfile.id, updateData as Partial<SeekerProfile>);
    
    return SeekerProfileMapper.toDto(updatedProfile, this._s3Service);
  }
}