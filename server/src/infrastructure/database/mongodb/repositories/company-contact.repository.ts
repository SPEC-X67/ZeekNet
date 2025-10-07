import { ICompanyContactRepository } from '../../../../domain/interfaces/repositories/company-contact.repository';
import { CompanyContact } from '../../../../domain/entities/company-contact.entity';
import { CompanyContactModel } from '../models/company-contact.model';
import { Types } from 'mongoose';
import { MongoBaseRepository } from '../../../../shared/base';

export class MongoCompanyContactRepository extends MongoBaseRepository<CompanyContact> implements ICompanyContactRepository {
  constructor() {
    super(CompanyContactModel);
  }

  /**
   * Map MongoDB document to CompanyContact entity
   */
  protected mapToEntity(doc: any): CompanyContact {
    return CompanyContact.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      twitterLink: doc.twitterLink,
      facebookLink: doc.facebookLink,
      linkedin: doc.linkedin,
      email: doc.email,
      phone: doc.phone,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Override create to handle ObjectId conversion
   */
  async create(contact: Omit<CompanyContact, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyContact> {
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
    return this.mapToEntity(savedContact);
  }

  async findByCompanyId(companyId: string): Promise<CompanyContact[]> {
    const contacts = await CompanyContactModel.find({ companyId: new Types.ObjectId(companyId) });
    return contacts.map(contact => this.mapToEntity(contact));
  }

  /**
   * Override update to handle ObjectId conversion
   */
  async update(id: string, data: Partial<CompanyContact>): Promise<CompanyContact | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedContact = await CompanyContactModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return updatedContact ? this.mapToEntity(updatedContact) : null;
  }
}

