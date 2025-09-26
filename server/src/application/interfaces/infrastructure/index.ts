import { UserRole } from '../../../domain/enums/user-role.enum';

export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}

export interface TokenPayload {
  sub: string;
  role?: UserRole;
  email?: string;
}

export interface TokenService {
  signAccess(payload: TokenPayload): string;
  signRefresh(payload: TokenPayload): string;
  verifyAccess(token: string): TokenPayload;
  verifyRefresh(token: string): TokenPayload;
}

export interface GoogleProfile {
  email: string;
  emailVerified: boolean;
  name: string;
  picture: string;
}

export interface GoogleTokenVerifier {
  verifyIdToken(idToken: string): Promise<GoogleProfile>;
}

export interface PasswordResetService {
  generateResetToken(userId: string, email: string): Promise<string>;
  getResetToken(
    token: string,
  ): Promise<{ userId: string; email: string } | null>;
  invalidateToken(token: string): Promise<void>;
  sendResetEmail(email: string, token: string): Promise<void>;
}

export interface OtpService {
  generateOtp(email: string): Promise<string>;
  verifyOtp(email: string, code: string): Promise<boolean>;
  generateAndStoreOtp(email: string): Promise<string>;
}

export interface MailerService {
  sendMail(to: string, subject: string, html: string): Promise<void>;
}

export interface IS3Service {
  uploadImage(
    file: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<string>;
  deleteImage(imageUrl: string): Promise<void>;
}
