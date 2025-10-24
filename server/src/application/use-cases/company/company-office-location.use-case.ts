import { ICompanyOfficeLocationRepository } from '../../../domain/interfaces/repositories';
import { CompanyOfficeLocation } from '../../../domain/entities/company-office-location.entity';
import { CreateCompanyOfficeLocationDto, UpdateCompanyOfficeLocationDto } from '../../dto/company/company-office-location.dto';
import { NotFoundError } from '../../../domain/errors/errors';

export class CompanyOfficeLocationUseCase {
  constructor(private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository) {}

  async createOfficeLocation(companyId: string, data: CreateCompanyOfficeLocationDto): Promise<CompanyOfficeLocation> {
    const officeLocation = CompanyOfficeLocation.create({ ...data, companyId });
    return this._companyOfficeLocationRepository.create(officeLocation);
  }

  async getOfficeLocationsByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]> {
    return this._companyOfficeLocationRepository.findByCompanyId(companyId);
  }

  async getOfficeLocationById(locationId: string): Promise<CompanyOfficeLocation | null> {
    return this._companyOfficeLocationRepository.findById(locationId);
  }

  async updateOfficeLocation(locationId: string, data: UpdateCompanyOfficeLocationDto): Promise<CompanyOfficeLocation> {
    const existingLocation = await this._companyOfficeLocationRepository.findById(locationId);
    if (!existingLocation) {
      throw new NotFoundError(`Company office location with ID ${locationId} not found`);
    }
    const updatedLocation = await this._companyOfficeLocationRepository.update(locationId, data);
    if (!updatedLocation) {
      throw new NotFoundError(`Failed to update company office location with ID ${locationId}`);
    }
    return updatedLocation;
  }

  async deleteOfficeLocation(locationId: string): Promise<void> {
    await this._companyOfficeLocationRepository.delete(locationId);
  }
}
