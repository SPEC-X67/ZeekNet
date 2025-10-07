import { User } from '../../../../domain/entities';
import { UserDocument } from '../models/user.model';

export class UserMapper {
  static toDomain(doc: UserDocument): User {
    return new User(
      String(doc._id),
      doc.name ?? '',
      doc.email,
      doc.password,
      doc.role,
      doc.isVerified,
      doc.isBlocked,
      doc.refreshToken ?? null,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
