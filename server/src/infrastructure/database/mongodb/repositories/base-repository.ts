import { Model, Document as MongooseDocument, FilterQuery } from 'mongoose';
import { Types } from 'mongoose';
import { IBaseRepository } from '../../../../domain/interfaces/repositories/IBaseRepository';

export abstract class RepositoryBase<T, TDocument extends MongooseDocument> 
implements IBaseRepository<T> 
{
  constructor(protected model: Model<TDocument>) {}

  
  protected convertToObjectIds(data: Record<string, unknown>): Record<string, unknown> {
    const converted = { ...data };
    
    
    for (const key in converted) {
      if (key.endsWith('Id') || key === 'companyId') {
        const value = converted[key];
        if (typeof value === 'string' && value.length === 24 && /^[0-9a-fA-F]{24}$/.test(value)) {
          
          converted[key] = this.toObjectId(value);
        }
      }
    }
    
    return converted;
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const convertedData = this.convertToObjectIds(data as Record<string, unknown>);
    
    const document = new this.model({
      ...convertedData,
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

    const document = await this.model.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true },
    );

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

  protected async findOne(filter: FilterQuery<TDocument> | Record<string, unknown>): Promise<T | null> {
    const document = await this.model.findOne(filter as FilterQuery<TDocument>);
    return document ? this.mapToEntity(document) : null;
  }

  protected async findMany(filter: FilterQuery<TDocument> | Record<string, unknown>): Promise<T[]> {
    const documents = await this.model.find(filter as FilterQuery<TDocument>);
    return documents.map((doc) => this.mapToEntity(doc));
  }

  protected async countDocuments(filter: FilterQuery<TDocument> | Record<string, unknown>): Promise<number> {
    return await this.model.countDocuments(filter as FilterQuery<TDocument>);
  }

  protected async exists(filter: FilterQuery<TDocument> | Record<string, unknown>): Promise<boolean> {
    const count = await this.model.countDocuments(filter as FilterQuery<TDocument>);
    return count > 0;
  }

  protected toObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  protected abstract mapToEntity(document: TDocument): T;
}