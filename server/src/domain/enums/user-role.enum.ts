// User Roles
export enum UserRole {
  SEEKER = 'seeker',
  ADMIN = 'admin',
  COMPANY = 'company',
}

// User Status
export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  PENDING = 'pending',
}

// HTTP Status Codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

// JWT Token Types
export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

// Email Types
export enum EmailType {
  WELCOME = 'welcome',
  PASSWORD_RESET = 'password_reset',
  ACCOUNT_VERIFICATION = 'account_verification',
  ACCOUNT_BLOCKED = 'account_blocked',
  ACCOUNT_UNBLOCKED = 'account_unblocked',
}
