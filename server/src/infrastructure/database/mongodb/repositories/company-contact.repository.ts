import { ICompanyContactRepository } from '../../../../domain/interfaces/repositories';
import { CompanyContact } from '../../../../domain/entities/company-contact.entity';
import { CompanyContactModel } from '../models/company-contact.model';
import { Types } from 'mongoose';
import { CompanyContactMapper } from '../mappers';

export class CompanyContactRepository implements ICompanyContactRepository {
  async createContact(contact: Omit<CompanyContact, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyContact> {
    const contactDoc = new CompanyContactModel({
      companyId: new Types.ObjectId(contact.companyId),
      twitterLink: contact.twitterLink,
      facebookLink: contact.facebookLink,
      linkedin: contact.linkedin,
      email: contact.email,
      phone: contact.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedContact = await contactDoc.save();
    return CompanyContactMapper.toEntity(savedContact);
  }

  async getContactByCompanyId(companyId: string): Promise<CompanyContact | null> {
    const doc = await CompanyContactModel.findOne({ companyId: new Types.ObjectId(companyId) });
    return doc ? CompanyContactMapper.toEntity(doc) : null;
  }

  async updateContact(companyId: string, updates: Partial<CompanyContact>): Promise<CompanyContact> {
    const updated = await CompanyContactModel.findOneAndUpdate(
      { companyId: new Types.ObjectId(companyId) },
      {
        ...updates,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!updated) throw new Error('Contact not found');
    return CompanyContactMapper.toEntity(updated);
  }

  async deleteContact(companyId: string): Promise<void> {
    await CompanyContactModel.findOneAndDelete({ companyId: new Types.ObjectId(companyId) });
  }

  async existsByCompanyId(companyId: string): Promise<boolean> {
    const count = await CompanyContactModel.countDocuments({ companyId: new Types.ObjectId(companyId) });
    return count > 0;
  }

  async findByCompanyId(companyId: string): Promise<CompanyContact | null> {
    return this.getContactByCompanyId(companyId);
  }

  async create(data: Omit<CompanyContact, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyContact> {
    return this.createContact(data);
  }

  async findById(id: string): Promise<CompanyContact | null> {
    const doc = await CompanyContactModel.findById(new Types.ObjectId(id));
    return doc ? CompanyContactMapper.toEntity(doc) : null;
  }

  async findAll(): Promise<CompanyContact[]> {
    const docs = await CompanyContactModel.find();
    return docs.map((doc) => CompanyContactMapper.toEntity(doc));
  }

  async update(id: string, updates: Partial<CompanyContact>): Promise<CompanyContact | null> {
    const updated = await CompanyContactModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      {
        ...updates,
        updatedAt: new Date(),
      },
      { new: true }
    );
    return updated ? CompanyContactMapper.toEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CompanyContactModel.findByIdAndDelete(new Types.ObjectId(id));
    return !!result;
  }

  async count(): Promise<number> {
    return CompanyContactModel.countDocuments();
  }
}
