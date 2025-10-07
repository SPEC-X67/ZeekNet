import { BaseEntity } from './base.entity';

export class CompanyContact extends BaseEntity {
  private constructor(
    id: string,
    public readonly companyId: string,
    public twitterLink?: string,
    public facebookLink?: string,
    public linkedin?: string,
    public email?: string,
    public phone?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    const now = new Date();
    super(id, createdAt || now, updatedAt || now);
  }

  static create(data: {
    id?: string;
    companyId: string;
    twitterLink?: string;
    facebookLink?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyContact {
    const now = new Date();
    return new CompanyContact(
      data.id || BaseEntity.generateId(),
      data.companyId,
      data.twitterLink,
      data.facebookLink,
      data.linkedin,
      data.email,
      data.phone,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateContact(data: {
    twitterLink?: string;
    facebookLink?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  }): CompanyContact {
    return CompanyContact.create({
      ...this.toJSON(),
      ...data,
      updatedAt: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      twitterLink: this.twitterLink,
      facebookLink: this.facebookLink,
      linkedin: this.linkedin,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: {
    id: string;
    companyId: string;
    twitterLink?: string;
    facebookLink?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): CompanyContact {
    return new CompanyContact(
      data.id,
      data.companyId,
      data.twitterLink,
      data.facebookLink,
      data.linkedin,
      data.email,
      data.phone,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
