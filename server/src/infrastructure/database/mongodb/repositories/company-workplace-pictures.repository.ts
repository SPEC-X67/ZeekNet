import { injectable } from 'inversify';
import { ICompanyWorkplacePicturesRepository } from '../../../../domain/repositories/company-workplace-pictures.repository';
import { CompanyWorkplacePictures } from '../../../../domain/entities/company-workplace-pictures.entity';
import { CompanyWorkplacePicturesModel } from '../models/company-workplace-pictures.model';
import { Types } from 'mongoose';

@injectable()
export class MongoCompanyWorkplacePicturesRepository implements ICompanyWorkplacePicturesRepository {
  async create(picture: CompanyWorkplacePictures): Promise<CompanyWorkplacePictures> {
    const pictureDoc = new CompanyWorkplacePicturesModel({
      companyId: new Types.ObjectId(picture.companyId),
      pictureUrl: picture.pictureUrl,
      caption: picture.caption,
    });

    const savedPicture = await pictureDoc.save();
    return this.mapDocumentToEntity(savedPicture);
  }

  async findById(id: string): Promise<CompanyWorkplacePictures | null> {
    const picture = await CompanyWorkplacePicturesModel.findById(id);
    return picture ? this.mapDocumentToEntity(picture) : null;
  }

  async findByCompanyId(companyId: string): Promise<CompanyWorkplacePictures[]> {
    const pictures = await CompanyWorkplacePicturesModel.find({ companyId: new Types.ObjectId(companyId) });
    return pictures.map(picture => this.mapDocumentToEntity(picture));
  }

  async update(picture: CompanyWorkplacePictures): Promise<CompanyWorkplacePictures> {
    const updatedPicture = await CompanyWorkplacePicturesModel.findByIdAndUpdate(
      picture.id,
      {
        pictureUrl: picture.pictureUrl,
        caption: picture.caption,
      },
      { new: true }
    );

    if (!updatedPicture) {
      throw new Error('Workplace picture not found');
    }

    return this.mapDocumentToEntity(updatedPicture);
  }

  async delete(id: string): Promise<void> {
    await CompanyWorkplacePicturesModel.findByIdAndDelete(id);
  }

  private mapDocumentToEntity(doc: any): CompanyWorkplacePictures {
    return CompanyWorkplacePictures.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      pictureUrl: doc.pictureUrl,
      caption: doc.caption,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

