import { ICompanyContactRepository } from '../../../../domain/interfaces/repositories/company/ICompanyContactRepository';
import { CompanyContact } from '../../../../domain/entities/company-contact.entity';
import { CompanyContactModel, CompanyContactDocument } from '../models/company-contact.model';
import { Types } from 'mongoose';
import { CompanyContactMapper } from '../mappers/company-contact.mapper';
import { RepositoryBase } from './base-repository';

export class CompanyContactRepository extends RepositoryBase<CompanyContact, CompanyContactDocument> implements ICompanyContactRepository {
  constructor() {
    super(CompanyContactModel);
  }

  protected mapToEntity(doc: CompanyContactDocument): CompanyContact {
    return CompanyContactMapper.toEntity(doc);
  }

  protected convertToObjectIds(data: Partial<CompanyContact>): Partial<CompanyContact> {
    const converted = { ...data };
    if (converted.companyId && typeof converted.companyId === 'string') {
      (converted as Record<string, unknown>).companyId = new Types.ObjectId(converted.companyId);
    }
    return converted;
  }

  async createContact(contact: Omit<CompanyContact, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyContact> {
    return await this.create(contact);
  }

  async getContactByCompanyId(companyId: string): Promise<CompanyContact | null> {
    return await this.findOne({ companyId: new Types.ObjectId(companyId) });
  }

  async updateContact(companyId: string, updates: Partial<CompanyContact>): Promise<CompanyContact> {
    const updated = await this.model.findOneAndUpdate(
      { companyId: new Types.ObjectId(companyId) },
      {
        ...updates,
        updatedAt: new Date(),
      },
      { new: true },
    );
    if (!updated) throw new Error('Contact not found');
    return this.mapToEntity(updated);
  }

  async deleteContact(companyId: string): Promise<void> {
    await this.model.findOneAndDelete({ companyId: new Types.ObjectId(companyId) });
  }

  async existsByCompanyId(companyId: string): Promise<boolean> {
    return await this.exists({ companyId: new Types.ObjectId(companyId) });
  }

  async findByCompanyId(companyId: string): Promise<CompanyContact | null> {
    return this.getContactByCompanyId(companyId);
  }

}
