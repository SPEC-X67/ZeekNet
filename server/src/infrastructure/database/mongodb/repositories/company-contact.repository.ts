import { injectable } from 'inversify';
import { ICompanyContactRepository } from '../../../../domain/repositories/company-contact.repository';
import { CompanyContact } from '../../../../domain/entities/company-contact.entity';
import { CompanyContactModel } from '../models/company-contact.model';
import { Types } from 'mongoose';

@injectable()
export class MongoCompanyContactRepository implements ICompanyContactRepository {
  async create(contact: CompanyContact): Promise<CompanyContact> {
    const contactDoc = new CompanyContactModel({
      companyId: new Types.ObjectId(contact.companyId),
      twitterLink: contact.twitterLink,
      facebookLink: contact.facebookLink,
      linkedin: contact.linkedin,
      email: contact.email,
      phone: contact.phone,
    });

    const savedContact = await contactDoc.save();
    return this.mapDocumentToEntity(savedContact);
  }

  async findById(id: string): Promise<CompanyContact | null> {
    const contact = await CompanyContactModel.findById(id);
    return contact ? this.mapDocumentToEntity(contact) : null;
  }

  async findByCompanyId(companyId: string): Promise<CompanyContact[]> {
    const contacts = await CompanyContactModel.find({ companyId: new Types.ObjectId(companyId) });
    return contacts.map(contact => this.mapDocumentToEntity(contact));
  }

  async update(contact: CompanyContact): Promise<CompanyContact> {
    const updatedContact = await CompanyContactModel.findByIdAndUpdate(
      contact.id,
      {
        twitterLink: contact.twitterLink,
        facebookLink: contact.facebookLink,
        linkedin: contact.linkedin,
        email: contact.email,
        phone: contact.phone,
      },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return this.mapDocumentToEntity(updatedContact);
  }

  async delete(id: string): Promise<void> {
    await CompanyContactModel.findByIdAndDelete(id);
  }

  private mapDocumentToEntity(doc: any): CompanyContact {
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
}

