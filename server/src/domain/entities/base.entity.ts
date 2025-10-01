import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  protected static generateId(): string {
    return uuidv4();
  }
}

