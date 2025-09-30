import { BaseEntity } from './base.entity';

export class CompanyOfficeLocation extends BaseEntity {
  private constructor(
    id: string,
    public readonly companyId: string,
    public location: string,
    public isHeadquarters: boolean,
    public officeName?: string,
    public address?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    const now = new Date();
    super(id, createdAt || now, updatedAt || now);
  }

  static create(data: {
    id?: string;
    companyId: string;
    location: string;
    officeName?: string;
    address?: string;
    isHeadquarters?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyOfficeLocation {
    const now = new Date();
    return new CompanyOfficeLocation(
      data.id || BaseEntity.generateId(),
      data.companyId,
      data.location,
      data.isHeadquarters ?? false,
      data.officeName,
      data.address,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateOfficeLocation(data: {
    location?: string;
    officeName?: string;
    address?: string;
    isHeadquarters?: boolean;
  }): CompanyOfficeLocation {
    return CompanyOfficeLocation.create({
      ...this.toJSON(),
      ...data,
      updatedAt: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      location: this.location,
      officeName: this.officeName,
      address: this.address,
      isHeadquarters: this.isHeadquarters,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: any): CompanyOfficeLocation {
    return new CompanyOfficeLocation(
      data.id,
      data.companyId,
      data.location,
      data.isHeadquarters,
      data.officeName,
      data.address,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
