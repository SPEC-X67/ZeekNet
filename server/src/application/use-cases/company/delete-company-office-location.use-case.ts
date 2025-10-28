import { ICompanyOfficeLocationRepository } from '../../../domain/interfaces/repositories';
import { NotFoundError } from '../../../domain/errors/errors';
import { IDeleteCompanyOfficeLocationUseCase } from '../../../domain/interfaces/use-cases';

export class DeleteCompanyOfficeLocationUseCase implements IDeleteCompanyOfficeLocationUseCase {
  constructor(private readonly _companyOfficeLocationRepository: ICompanyOfficeLocationRepository) {}

  async execute(locationId: string): Promise<void> {
    const existingLocation = await this._companyOfficeLocationRepository.findById(locationId);
    if (!existingLocation) {
      throw new NotFoundError(`Company office location with ID ${locationId} not found`);
    }
    await this._companyOfficeLocationRepository.delete(locationId);
  }
}

