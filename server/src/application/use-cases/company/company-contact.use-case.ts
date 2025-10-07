import { ICompanyContactRepository } from '../../../domain/interfaces/repositories/company-contact.repository';
import { CompanyContact } from '../../../domain/entities/company-contact.entity';
import { CreateCompanyContactDto, UpdateCompanyContactDto } from '../../dto/company/company-contact.dto';
import { NotFoundError } from '../../../domain/errors/errors';

export class CompanyContactUseCase {
  constructor(
    private readonly _companyContactRepository: ICompanyContactRepository,
  ) {}

  async createContact(companyId: string, data: CreateCompanyContactDto): Promise<CompanyContact> {
    const contact = CompanyContact.create({ ...data, companyId });
    return this._companyContactRepository.create(contact);
  }

  async getContactsByCompanyId(companyId: string): Promise<CompanyContact[]> {
    return this._companyContactRepository.findByCompanyId(companyId);
  }

  async updateContact(contactId: string, data: UpdateCompanyContactDto): Promise<CompanyContact> {
    const existingContact = await this._companyContactRepository.findById(contactId);
    if (!existingContact) {
      throw new NotFoundError(`Company contact with ID ${contactId} not found`);
    }
    const updatedContact = await this._companyContactRepository.update(contactId, data);
    if (!updatedContact) {
      throw new NotFoundError(`Failed to update company contact with ID ${contactId}`);
    }
    return updatedContact;
  }

  async deleteContact(contactId: string): Promise<void> {
    await this._companyContactRepository.delete(contactId);
  }
}
