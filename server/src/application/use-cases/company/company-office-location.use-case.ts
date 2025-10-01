import { injectable, inject } from 'inversify';
import { ICompanyOfficeLocationRepository } from '../../../domain/repositories/company-office-location.repository';
import { CompanyOfficeLocation } from '../../../domain/entities/company-office-location.entity';
import { TYPES } from '../../../infrastructure/di/types';
import { CreateCompanyOfficeLocationDto, UpdateCompanyOfficeLocationDto } from '../../dto/company/company-office-location.dto';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class CompanyOfficeLocationUseCase {
  constructor(
    @inject(TYPES.CompanyOfficeLocationRepository)
    private readonly companyOfficeLocationRepository: ICompanyOfficeLocationRepository,
  ) {}

  async createOfficeLocation(companyId: string, data: CreateCompanyOfficeLocationDto): Promise<CompanyOfficeLocation> {
    const officeLocation = CompanyOfficeLocation.create({ ...data, companyId });
    return this.companyOfficeLocationRepository.create(officeLocation);
  }

  async getOfficeLocationsByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]> {
    return this.companyOfficeLocationRepository.findByCompanyId(companyId);
  }

  async getOfficeLocationById(locationId: string): Promise<CompanyOfficeLocation | null> {
    return this.companyOfficeLocationRepository.findById(locationId);
  }

  async updateOfficeLocation(locationId: string, data: UpdateCompanyOfficeLocationDto): Promise<CompanyOfficeLocation> {
    const existingLocation = await this.companyOfficeLocationRepository.findById(locationId);
    if (!existingLocation) {
      throw new NotFoundError(`Company office location with ID ${locationId} not found`);
    }
    const updatedLocation = await this.companyOfficeLocationRepository.update(locationId, data);
    if (!updatedLocation) {
      throw new NotFoundError(`Failed to update company office location with ID ${locationId}`);
    }
    return updatedLocation;
  }

  async deleteOfficeLocation(locationId: string): Promise<void> {
    await this.companyOfficeLocationRepository.delete(locationId);
  }
}
