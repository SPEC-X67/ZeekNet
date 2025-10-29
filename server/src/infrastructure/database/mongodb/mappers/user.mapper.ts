import { User } from '../../../../domain/entities/user.entity';
import { UserDocument } from '../models/user.model';

export class UserMapper {
  static toEntity(doc: UserDocument): User {
    return User.create({
      id: String(doc._id),
      name: doc.name || '',
      email: doc.email,
      password: doc.password,
      role: doc.role,
      isVerified: doc.isVerified,
      isBlocked: doc.isBlocked,
      refreshToken: doc.refreshToken || null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

