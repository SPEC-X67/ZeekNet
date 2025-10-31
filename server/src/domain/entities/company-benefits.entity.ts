import { v4 as uuidv4 } from 'uuid';

export class CompanyBenefits {
  private constructor(
    public readonly id: string,
    public readonly companyId: string,
    public perk: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public description?: string,
  ) {}

  static create(data: { id?: string; companyId: string; perk: string; description?: string; createdAt?: Date; updatedAt?: Date }): CompanyBenefits {
    const now = new Date();
    return new CompanyBenefits(data.id || uuidv4(), data.companyId, data.perk, data.createdAt ?? now, data.updatedAt ?? now, data.description);
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      perk: this.perk,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: {
    id: string;
    companyId: string;
    perk: string;
    description?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): CompanyBenefits {
    return new CompanyBenefits(data.id, data.companyId, data.perk, new Date(data.createdAt), new Date(data.updatedAt), data.description);
  }
}