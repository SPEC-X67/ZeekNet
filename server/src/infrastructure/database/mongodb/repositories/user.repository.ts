import { IUserRepository } from '../../../../domain/interfaces/repositories/user/IUserRepository';
import { IUserAuthRepository } from '../../../../domain/interfaces/repositories/user/IUserRepository';
import { IUserManagementRepository } from '../../../../domain/interfaces/repositories/user/IUserRepository';
import { User } from '../../../../domain/entities/user.entity';
import { UserRole } from '../../../../domain/enums/user-role.enum';
import { UserModel, UserDocument } from '../models/user.model';
import { IUserData } from '../../../../domain/interfaces/repositories/user/IUserRepository';
import { UserMapper } from '../mappers/user.mapper';
import { Types } from 'mongoose';

export class UserRepository implements IUserRepository, IUserAuthRepository, IUserManagementRepository {
  protected model = UserModel;

  protected mapToEntity(document: UserDocument): User {
    return UserMapper.toEntity(document);
  }

  async create(userData: IUserData): Promise<User> {
    const { id, ...dataWithoutId } = userData;
    const document = await this.model.create({
      ...dataWithoutId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.mapToEntity(document);
  }

  async save(userData: Partial<IUserData>): Promise<User> {
    const data = {
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password || '',
      role: userData.role || UserRole.SEEKER,
      isVerified: userData.isVerified ?? false,
      isBlocked: userData.isBlocked ?? false,
      refreshToken: userData.refreshToken || null,
    };
    
    const document = await this.model.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.mapToEntity(document);
  }

  async findById(id: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const document = await this.model.findById(id);
    return document ? this.mapToEntity(document) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const document = await this.model.findOne({ email });
    return document ? this.mapToEntity(document) : null;
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    const document = await this.model.findOne({ refreshToken });
    return document ? this.mapToEntity(document) : null;
  }

  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    await this.model.findByIdAndUpdate(id, { refreshToken }).exec();
  }

  async updateVerificationStatus(email: string, isVerified: boolean): Promise<void> {
    await this.model.findOneAndUpdate({ email }, { isVerified }).exec();
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { password: hashedPassword, updatedAt: new Date() }).exec();
  }

  async findAllUsers(options: { page?: number; limit?: number; search?: string; role?: UserRole; isBlocked?: boolean; sortBy?: string; sortOrder?: 'asc' | 'desc' }): Promise<{ users: User[]; total: number }> {
    const query: Record<string, unknown> = {};

    if (options.search) {
      query.$or = [{ name: { $regex: options.search, $options: 'i' } }, { email: { $regex: options.search, $options: 'i' } }];
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
    const sort: Record<string, 1 | -1> = {};

    if (options.sortBy) {
      sort[options.sortBy] = options.sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    const [documents, total] = await Promise.all([this.model.find(query).sort(sort).skip(skip).limit(limit).exec(), this.model.countDocuments(query).exec()]);

    return {
      users: documents.map((doc) => this.mapToEntity(doc)),
      total,
    };
  }

  async findUsersByRole(role: UserRole): Promise<User[]> {
    const documents = await this.model.find({ role });
    return documents.map((doc) => this.mapToEntity(doc));
  }

  async findBlockedUsers(): Promise<User[]> {
    const documents = await this.model.find({ isBlocked: true });
    return documents.map((doc) => this.mapToEntity(doc));
  }

  private async setBlockStatus(id: string, isBlocked: boolean): Promise<void> {
    await this.model.findByIdAndUpdate(id, { isBlocked, updatedAt: new Date() }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    verifiedUsers: number;
    blockedUsers: number;
    usersByRole: Record<string, number>;
  }> {
    const [totalUsers, verifiedUsers, blockedUsers, usersByRole] = await Promise.all([this.model.countDocuments(), this.model.countDocuments({ isVerified: true }), this.model.countDocuments({ isBlocked: true }), this.model.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }])]);

    const roleStats: Record<string, number> = {};
    usersByRole.forEach((stat: { _id: string; count: number }) => {
      roleStats[stat._id] = stat.count;
    });

    return {
      totalUsers,
      verifiedUsers,
      blockedUsers,
      usersByRole: roleStats,
    };
  }

  async getAllUsers(options: { page: number; limit: number; search?: string; role?: UserRole; isVerified?: boolean; isBlocked?: boolean }): Promise<{ users: User[]; total: number }> {
    return this.findAllUsers({
      ...options,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  }

  async blockUser(userId: string, isBlocked: boolean): Promise<void> {
    await this.setBlockStatus(userId, isBlocked);
  }

  async updateUserBlockStatus(id: string, isBlocked: boolean): Promise<void> {
    await this.setBlockStatus(id, isBlocked);
  }
}
