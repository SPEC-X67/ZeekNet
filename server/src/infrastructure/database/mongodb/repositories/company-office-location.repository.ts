import { ICompanyOfficeLocationRepository } from '../../../../domain/interfaces/repositories/company-office-location.repository';
import { CompanyOfficeLocation } from '../../../../domain/entities/company-office-location.entity';
import { CompanyOfficeLocationModel } from '../models/company-office-location.model';
import { Types } from 'mongoose';
import { MongoBaseRepository } from '../../../../shared/base';

export class MongoCompanyOfficeLocationRepository extends MongoBaseRepository<CompanyOfficeLocation> implements ICompanyOfficeLocationRepository {
  constructor() {
    super(CompanyOfficeLocationModel);
  }

  /**
   * Map MongoDB document to CompanyOfficeLocation entity
   */
  protected mapToEntity(doc: any): CompanyOfficeLocation {
    return CompanyOfficeLocation.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      location: doc.location,
      isHeadquarters: doc.isHeadquarters,
      officeName: doc.officeName,
      address: doc.address,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Override create to handle ObjectId conversion
   */
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
    return locations.map(location => this.mapToEntity(location));
  }

  /**
   * Override update to handle ObjectId conversion
   */
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

