import { BaseEntity } from './base.entity';

export class CompanyWorkplacePictures extends BaseEntity {
  private constructor(
    id: string,
    public readonly companyId: string,
    public pictureUrl: string,
    public caption?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    const now = new Date();
    super(id, createdAt || now, updatedAt || now);
  }

  static create(data: {
    id?: string;
    companyId: string;
    pictureUrl: string;
    caption?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyWorkplacePictures {
    const now = new Date();
    return new CompanyWorkplacePictures(
      data.id || BaseEntity.generateId(),
      data.companyId,
      data.pictureUrl,
      data.caption,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updatePicture(data: { pictureUrl?: string; caption?: string }): CompanyWorkplacePictures {
    return CompanyWorkplacePictures.create({
      ...this.toJSON(),
      ...data,
      updatedAt: new Date(),
    });
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this.companyId,
      pictureUrl: this.pictureUrl,
      caption: this.caption,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: {
    id: string;
    companyId: string;
    pictureUrl: string;
    caption?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): CompanyWorkplacePictures {
    return new CompanyWorkplacePictures(
      data.id,
      data.companyId,
      data.pictureUrl,
      data.caption,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
