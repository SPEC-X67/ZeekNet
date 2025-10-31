import { ISeekerProfileRepository } from '../../../domain/interfaces/repositories/seeker/ISeekerProfileRepository';
import { IGetSeekerProfileUseCase } from '../../../domain/interfaces/use-cases/ISeekerUseCases';
import { NotFoundError } from '../../../domain/errors/errors';
import { SeekerProfileMapper } from '../../mappers/seeker-profile.mapper';
import { SeekerProfileResponseDto } from '../../dto/seeker/seeker-profile-response.dto';

export class GetSeekerProfileUseCase implements IGetSeekerProfileUseCase {
  constructor(
    private readonly _seekerProfileRepository: ISeekerProfileRepository,
  ) {}

  async execute(userId: string): Promise<SeekerProfileResponseDto> {
    const profile = await this._seekerProfileRepository.getProfileByUserId(userId);
    
    if (!profile) {
      throw new NotFoundError('Seeker profile not found');
    }

    return SeekerProfileMapper.toDto(profile);
  }
}
