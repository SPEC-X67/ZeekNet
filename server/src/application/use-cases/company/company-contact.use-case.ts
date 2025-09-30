import { injectable, inject } from 'inversify';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyContactRepository } from '../../../domain/repositories/company-contact.repository';
import { CompanyContact } from '../../../domain/entities/company-contact.entity';
import { CreateCompanyContactDto, UpdateCompanyContactDto } from '../../dto/company/company-contact.dto';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class CompanyContactUseCase {
  constructor(
    @inject(TYPES.CompanyContactRepository)
    private readonly companyContactRepository: ICompanyContactRepository,
  ) {}

  async createContact(companyId: string, data: CreateCompanyContactDto): Promise<CompanyContact> {
    const contact = CompanyContact.create({ ...data, companyId });
    return this.companyContactRepository.create(contact);
  }

  async getContactsByCompanyId(companyId: string): Promise<CompanyContact[]> {
    return this.companyContactRepository.findByCompanyId(companyId);
  }

  async updateContact(contactId: string, data: UpdateCompanyContactDto): Promise<CompanyContact> {
    const existingContact = await this.companyContactRepository.findById(contactId);
    if (!existingContact) {
      throw new NotFoundError(`Company contact with ID ${contactId} not found`);
    }
    const updatedContact = existingContact.updateContact(data);
    return this.companyContactRepository.update(updatedContact);
  }

  async deleteContact(contactId: string): Promise<void> {
    await this.companyContactRepository.delete(contactId);
  }
}
