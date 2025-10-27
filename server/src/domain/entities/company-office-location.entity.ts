import { v4 as uuidv4 } from 'uuid';

export class CompanyOfficeLocation {
  private constructor(
    public readonly id: string,
    public readonly companyId: string,
    public location: string,
    public isHeadquarters: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public officeName?: string,
    public address?: string,
  ) {}

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
      data.id || uuidv4(),
      data.companyId,
      data.location,
      data.isHeadquarters ?? false,
      data.createdAt ?? now,
      data.updatedAt ?? now,
      data.officeName,
      data.address,
    );
  }

  updateOfficeLocation(data: { location?: string; officeName?: string; address?: string; isHeadquarters?: boolean }): CompanyOfficeLocation {
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

  static fromJSON(data: {
    id: string;
    companyId: string;
    location: string;
    isHeadquarters: boolean;
    officeName?: string;
    address?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): CompanyOfficeLocation {
    return new CompanyOfficeLocation(
      data.id,
      data.companyId,
      data.location,
      data.isHeadquarters,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.officeName,
      data.address,
    );
  }
}
