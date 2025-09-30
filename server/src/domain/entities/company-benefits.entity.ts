import { BaseEntity } from './base.entity';

export class CompanyBenefits extends BaseEntity {
  private constructor(
    id: string,
    public readonly companyId: string,
    public perk: string,
    public description?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    const now = new Date();
    super(id, createdAt || now, updatedAt || now);
  }

  static create(data: {
    id?: string;
    companyId: string;
    perk: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyBenefits {
    const now = new Date();
    return new CompanyBenefits(
      data.id || BaseEntity.generateId(),
      data.companyId,
      data.perk,
      data.description,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateBenefit(data: { perk?: string; description?: string }): CompanyBenefits {
    return CompanyBenefits.create({
      ...this.toJSON(),
      ...data,
      updatedAt: new Date(),
    });
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

  static fromJSON(data: any): CompanyBenefits {
    return new CompanyBenefits(
      data.id,
      data.companyId,
      data.perk,
      data.description,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
