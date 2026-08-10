import { injectable, inject } from 'inversify';
import { TYPES } from 'src/shared/constants/types';
import { ICompanyOfficeLocationRepository } from 'src/domain/interfaces/repositories/company/ICompanyOfficeLocationRepository';
import { UpdateCompanyOfficeLocationRequestDto, CompanyLocationResponseDto } from 'src/application/dtos/company-office-location.dto';
import { NotFoundError, AuthorizationError } from 'src/domain/errors/errors';
import { IUpdateCompanyOfficeLocationUseCase } from 'src/domain/interfaces/use-cases/company/profile/location/IUpdateCompanyOfficeLocationUseCase';
import { IGetCompanyIdByUserIdUseCase } from 'src/domain/interfaces/use-cases/admin/companies/IGetCompanyIdByUserIdUseCase';
import { CompanyOfficeLocationMapper } from 'src/application/mappers/company/profile/company-office-location.mapper';

@injectable()
export class UpdateCompanyOfficeLocationUseCase implements IUpdateCompanyOfficeLocationUseCase {
  constructor(
    @inject(TYPES.CompanyOfficeLocationRepository) private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
    @inject(TYPES.GetCompanyIdByUserIdUseCase) private readonly _getCompanyIdByUserIdUseCase: IGetCompanyIdByUserIdUseCase,
  ) {}

  async execute(data: UpdateCompanyOfficeLocationRequestDto): Promise<CompanyLocationResponseDto> {
    const companyId = await this._getCompanyIdByUserIdUseCase.execute(data.userId);
    const { userId, locationId, ...updateData } = data;
    const existingLocation = await this._companyOfficeLocationRepository.findById(locationId);
    if (!existingLocation) {
      throw new NotFoundError(`Company office location with ID ${locationId} not found`);
    }
    if (existingLocation.companyId !== companyId) {
      throw new AuthorizationError('Not authorized to update this office location');
    }
    const updatedLocation = await this._companyOfficeLocationRepository.update(locationId, updateData);
    if (!updatedLocation) {
      throw new NotFoundError(`Failed to update company office location with ID ${locationId}`);
    }
    return CompanyOfficeLocationMapper.toResponse(updatedLocation);
  }
}

