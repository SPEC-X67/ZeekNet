import { ICompanyContactRepository } from '../../../domain/interfaces/repositories';
import { CompanyContact } from '../../../domain/entities/company-contact.entity';
import { ICompanyContactUseCase } from '../../../domain/interfaces/use-cases';

export class CompanyContactUseCase implements ICompanyContactUseCase {
  constructor(private readonly _companyContactRepository: ICompanyContactRepository) {}

  async createContact(companyId: string, data: any): Promise<CompanyContact> {
    return this._companyContactRepository.create({ ...data, companyId });
  }

  async getContactsByCompanyId(companyId: string): Promise<CompanyContact[]> {
    const contact = await this._companyContactRepository.findByCompanyId(companyId);
    return contact ? [contact] : [];
  }

  async updateContact(contactId: string, data: any): Promise<CompanyContact> {
    const updated = await this._companyContactRepository.update(contactId, data);
    if (!updated) throw new Error('Contact not found');
    return updated;
  }

  async deleteContact(contactId: string): Promise<void> {
    const deleted = await this._companyContactRepository.delete(contactId);
    if (!deleted) throw new Error('Contact not found');
  }
}

