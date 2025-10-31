export class JobCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, name: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}