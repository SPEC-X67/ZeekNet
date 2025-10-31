import { v4 as uuidv4 } from 'uuid';

export class CompanyWorkplacePictures {
  private constructor(
    public readonly id: string,
    public readonly companyId: string,
    public pictureUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public caption?: string,
  ) {}

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
      data.id || uuidv4(),
      data.companyId,
      data.pictureUrl,
      data.createdAt ?? now,
      data.updatedAt ?? now,
      data.caption,
    );
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
    return new CompanyWorkplacePictures(data.id, data.companyId, data.pictureUrl, new Date(data.createdAt), new Date(data.updatedAt), data.caption);
  }
}