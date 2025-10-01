import { injectable } from 'inversify';
import { IUserRepository } from '../../../../domain/repositories';
import { User } from '../../../../domain/entities';
import { UserRole } from '../../../../domain/enums/user-role.enum';
import { UserModel } from '../models/user.model';
import { MongoBaseRepository } from '../../../../shared/base';
import { Types } from 'mongoose';

/**
 * User Repository using Base Repository Pattern
 * 
 * This extends MongoBaseRepository to get basic CRUD operations
 * and adds user-specific methods
 */
@injectable()
export class BaseUserRepository extends MongoBaseRepository<User> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  protected mapToEntity(document: any): User {
    return User.create({
      id: document._id.toString(),
      name: document.name,
      email: document.email,
      password: document.password,
      role: document.role,
      isVerified: document.isVerified,
      isBlocked: document.isBlocked,
      refreshToken: document.refreshToken,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  // User-specific methods
  async save(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await this.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const document = await this.model.findOne({ email });
    return document ? this.mapToEntity(document) : null;
  }

  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    await this.model.findByIdAndUpdate(id, { refreshToken }).exec();
  }

  async updateVerificationStatus(email: string, isVerified: boolean): Promise<void> {
    await this.model.findOneAndUpdate({ email }, { isVerified }).exec();
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { password: hashedPassword }).exec();
  }

  async findAllUsers(options: {
    page?: number;
    limit?: number;
    search?: string;
    role?: UserRole;
    isBlocked?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ users: User[]; total: number }> {
    const query: any = {};
    
    if (options.search) {
      query.$or = [
        { name: { $regex: options.search, $options: 'i' } },
        { email: { $regex: options.search, $options: 'i' } },
      ];
    }
    
    if (options.role) {
      query.role = options.role;
    }
    
    if (options.isBlocked !== undefined) {
      query.isBlocked = options.isBlocked;
    }

    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    const sort: any = {};
    
    if (options.sortBy) {
      sort[options.sortBy] = options.sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    const [documents, total] = await Promise.all([
      this.model.find(query).sort(sort).skip(skip).limit(limit).exec(),
      this.model.countDocuments(query).exec()
    ]);

    return {
      users: documents.map(doc => this.mapToEntity(doc)),
      total,
    };
  }

  async findUsersByRole(role: UserRole): Promise<User[]> {
    const documents = await this.model.find({ role });
    return documents.map(doc => this.mapToEntity(doc));
  }

  async findBlockedUsers(): Promise<User[]> {
    const documents = await this.model.find({ isBlocked: true });
    return documents.map(doc => this.mapToEntity(doc));
  }

  async blockUser(id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { isBlocked: true }).exec();
  }

  async unblockUser(id: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { isBlocked: false }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    verifiedUsers: number;
    blockedUsers: number;
    usersByRole: Record<string, number>;
  }> {
    const [totalUsers, verifiedUsers, blockedUsers, usersByRole] = await Promise.all([
      this.model.countDocuments(),
      this.model.countDocuments({ isVerified: true }),
      this.model.countDocuments({ isBlocked: true }),
      this.model.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ])
    ]);

    const roleStats: Record<string, number> = {};
    usersByRole.forEach((stat: any) => {
      roleStats[stat._id] = stat.count;
    });

    return {
      totalUsers,
      verifiedUsers,
      blockedUsers,
      usersByRole: roleStats,
    };
  }
}
