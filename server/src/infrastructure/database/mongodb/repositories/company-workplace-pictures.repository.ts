import { ICompanyWorkplacePicturesRepository } from '../../../../domain/interfaces/repositories/company/ICompanyWorkplacePicturesRepository';
import { CompanyWorkplacePictures } from '../../../../domain/entities/company-workplace-pictures.entity';
import { CompanyWorkplacePicturesModel, CompanyWorkplacePicturesDocument } from '../models/company-workplace-pictures.model';
import { Types } from 'mongoose';
import { RepositoryBase } from '../../../../shared/base';
import { CompanyWorkplacePicturesMapper } from '../mappers';

export class CompanyWorkplacePicturesRepository extends RepositoryBase<CompanyWorkplacePictures, CompanyWorkplacePicturesDocument> implements ICompanyWorkplacePicturesRepository {
  constructor() {
    super(CompanyWorkplacePicturesModel);
  }

  protected mapToEntity(doc: CompanyWorkplacePicturesDocument): CompanyWorkplacePictures {
    return CompanyWorkplacePicturesMapper.toEntity(doc);
  }

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
      { new: true },
    );

    return updatedPicture ? this.mapToEntity(updatedPicture) : null;
  }
}

