import { injectable } from 'inversify';
import { ICompanyWorkplacePicturesRepository } from '../../../../domain/repositories/company-workplace-pictures.repository';
import { CompanyWorkplacePictures } from '../../../../domain/entities/company-workplace-pictures.entity';
import { CompanyWorkplacePicturesModel } from '../models/company-workplace-pictures.model';
import { Types } from 'mongoose';
import { MongoBaseRepository } from '../../../../shared/base';

@injectable()
export class MongoCompanyWorkplacePicturesRepository extends MongoBaseRepository<CompanyWorkplacePictures> implements ICompanyWorkplacePicturesRepository {
  constructor() {
    super(CompanyWorkplacePicturesModel);
  }

  /**
   * Map MongoDB document to CompanyWorkplacePictures entity
   */
  protected mapToEntity(doc: any): CompanyWorkplacePictures {
    return CompanyWorkplacePictures.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      pictureUrl: doc.pictureUrl,
      caption: doc.caption,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Override create to handle ObjectId conversion
   */
  async create(picture: Omit<CompanyWorkplacePictures, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyWorkplacePictures> {
    const pictureDoc = new CompanyWorkplacePicturesModel({
      companyId: new Types.ObjectId(picture.companyId),
      pictureUrl: picture.pictureUrl,
      caption: picture.caption,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPicture = await pictureDoc.save();
    return this.mapToEntity(savedPicture);
  }

  async findByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]> {
    const pictures = await CompanyWorkplacePicturesModel.find({ companyId: new Types.ObjectId(companyId) });
    return pictures.map(picture => this.mapToEntity(picture));
  }

  /**
   * Override update to handle ObjectId conversion
   */
  async update(id: string, data: Partial<CompanyWorkplacePictures>): Promise<CompanyWorkplacePictures | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedPicture = await CompanyWorkplacePicturesModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return updatedPicture ? this.mapToEntity(updatedPicture) : null;
  }
}

