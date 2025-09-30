import { BaseEntity } from './base.entity';

export class CompanyTeam extends BaseEntity {
  private constructor(
    id: string,
    public readonly companyId: string,
    public name: string,
    public role: string,
    public avatar?: string,
    public instagram?: string,
    public linkedin?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    const now = new Date();
    super(id, createdAt || now, updatedAt || now);
  }

  static create(data: {
    id?: string;
    companyId: string;
    name: string;
    role: string;
    avatar?: string;
    instagram?: string;
    linkedin?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyTeam {
    const now = new Date();
    return new CompanyTeam(
      data.id || BaseEntity.generateId(),
      data.companyId,
      data.name,
      data.role,
      data.avatar,
      data.instagram,
      data.linkedin,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateTeamMember(data: {
    name?: string;
    role?: string;
    avatar?: string;
    instagram?: string;
    linkedin?: string;
  }): CompanyTeam {
    return CompanyTeam.create({
      ...this.toJSON(),
      ...data,
      updatedAt: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      name: this.name,
      role: this.role,
      avatar: this.avatar,
      instagram: this.instagram,
      linkedin: this.linkedin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: any): CompanyTeam {
    return new CompanyTeam(
      data.id,
      data.companyId,
      data.name,
      data.role,
      data.avatar,
      data.instagram,
      data.linkedin,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
