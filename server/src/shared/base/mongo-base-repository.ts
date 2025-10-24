import { Model, Document as MongooseDocument } from 'mongoose';
import { Types } from 'mongoose';
import { IBaseRepository } from '../../domain/interfaces/repositories/base.repository';

export abstract class RepositoryBase<T, TDocument extends MongooseDocument = MongooseDocument> implements IBaseRepository<T> {
  constructor(protected model: Model<TDocument>) {}

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const document = new this.model({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedDocument = await document.save();
    return this.mapToEntity(savedDocument);
  }

  async findById(id: string): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.model.findById(id);
    return document ? this.mapToEntity(document) : null;
  }

  async findAll(): Promise<T[]> {
    const documents = await this.model.find();
    return documents.map((doc) => this.mapToEntity(doc));
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.model.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true });

    return document ? this.mapToEntity(document) : null;
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }

    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  async count(): Promise<number> {
    return await this.model.countDocuments();
  }

  protected abstract mapToEntity(document: TDocument): T;
}
