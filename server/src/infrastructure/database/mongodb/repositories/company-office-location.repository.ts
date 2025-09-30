import { injectable } from 'inversify';
import { ICompanyOfficeLocationRepository } from '../../../../domain/repositories/company-office-location.repository';
import { CompanyOfficeLocation } from '../../../../domain/entities/company-office-location.entity';
import { CompanyOfficeLocationModel } from '../models/company-office-location.model';
import { Types } from 'mongoose';

@injectable()
export class MongoCompanyOfficeLocationRepository implements ICompanyOfficeLocationRepository {
  async create(location: CompanyOfficeLocation): Promise<CompanyOfficeLocation> {
    const locationDoc = new CompanyOfficeLocationModel({
      companyId: new Types.ObjectId(location.companyId),
      location: location.location,
      isHeadquarters: location.isHeadquarters,
      officeName: location.officeName,
      address: location.address,
    });

    const savedLocation = await locationDoc.save();
    return this.mapDocumentToEntity(savedLocation);
  }

  async findById(id: string): Promise<CompanyOfficeLocation | null> {
    const location = await CompanyOfficeLocationModel.findById(id);
    return location ? this.mapDocumentToEntity(location) : null;
  }

  async findByCompanyId(companyId: string): Promise<CompanyOfficeLocation[]> {
    const locations = await CompanyOfficeLocationModel.find({ companyId: new Types.ObjectId(companyId) });
    return locations.map(location => this.mapDocumentToEntity(location));
  }

  async update(location: CompanyOfficeLocation): Promise<CompanyOfficeLocation> {
    const updatedLocation = await CompanyOfficeLocationModel.findByIdAndUpdate(
      location.id,
      {
        location: location.location,
        isHeadquarters: location.isHeadquarters,
        officeName: location.officeName,
        address: location.address,
      },
      { new: true }
    );

    if (!updatedLocation) {
      throw new Error('Office location not found');
    }

    return this.mapDocumentToEntity(updatedLocation);
  }

  async delete(id: string): Promise<void> {
    await CompanyOfficeLocationModel.findByIdAndDelete(id);
  }

  private mapDocumentToEntity(doc: any): CompanyOfficeLocation {
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
}

