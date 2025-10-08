import { v4 as uuidv4 } from 'uuid';

export class CompanyTechStack {
  private constructor(
    public readonly id: string,
    public readonly companyId: string,
    public techStack: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    companyId: string;
    techStack: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyTechStack {
    const now = new Date();
    return new CompanyTechStack(
      data.id || uuidv4(),
      data.companyId,
      data.techStack,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateTechStack(data: { techStack?: string }): CompanyTechStack {
    return CompanyTechStack.create({
      ...this.toJSON(),
      ...data,
      updatedAt: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      techStack: this.techStack,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: {
    id: string;
    companyId: string;
    techStack: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): CompanyTechStack {
    return new CompanyTechStack(
      data.id,
      data.companyId,
      data.techStack,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
