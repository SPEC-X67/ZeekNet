import { ICompanyOfficeLocationRepository } from '../../../../domain/interfaces/repositories/company/ICompanyOfficeLocationRepository';
import { CompanyOfficeLocation } from '../../../../domain/entities/company-office-location.entity';
import { CompanyOfficeLocationModel, CompanyOfficeLocationDocument } from '../models/company-office-location.model';
import { Types } from 'mongoose';
import { RepositoryBase } from '../../../../shared/base';
import { CompanyOfficeLocationMapper } from '../mappers';

export class CompanyOfficeLocationRepository
  extends RepositoryBase<CompanyOfficeLocation, CompanyOfficeLocationDocument>
  implements ICompanyOfficeLocationRepository
{
  constructor() {
    super(CompanyOfficeLocationModel);
  }

  protected mapToEntity(doc: CompanyOfficeLocationDocument): CompanyOfficeLocation {
    return CompanyOfficeLocationMapper.toEntity(doc);
  }

  async create(location: Omit<CompanyOfficeLocation, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyOfficeLocation> {
    const locationDoc = new CompanyOfficeLocationModel({
      companyId: new Types.ObjectId(location.companyId),
      location: location.location,
      isHeadquarters: location.isHeadquarters,
      officeName: location.officeName,
      address: location.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedLocation = await locationDoc.save();
    return this.mapToEntity(savedLocation);
  }

  async findByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]> {
    const locations = await CompanyOfficeLocationModel.find({ companyId: new Types.ObjectId(companyId) });
    return locations.map((location) => this.mapToEntity(location));
  }

  async update(id: string, data: Partial<CompanyOfficeLocation>): Promise<CompanyOfficeLocation | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedLocation = await CompanyOfficeLocationModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return updatedLocation ? this.mapToEntity(updatedLocation) : null;
  }
}
