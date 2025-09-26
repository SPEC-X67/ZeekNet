export class CompanyProfile {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly companyName: string,
    public readonly logo: string,
    public readonly banner: string,
    public readonly websiteLink: string,
    public readonly employeeCount: number,
    public readonly industry: string,
    public readonly organisation: string,
    public readonly aboutUs: string,
    public readonly isVerified: 'pending' | 'rejected' | 'verified',
    public readonly isBlocked: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    userId: string;
    companyName: string;
    logo: string;
    banner: string;
    websiteLink: string;
    employeeCount: number;
    industry: string;
    organisation: string;
    aboutUs: string;
    isVerified?: 'pending' | 'rejected' | 'verified';
    isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyProfile {
    const now = new Date();
    return new CompanyProfile(
      data.id,
      data.userId,
      data.companyName,
      data.logo,
      data.banner,
      data.websiteLink,
      data.employeeCount,
      data.industry,
      data.organisation,
      data.aboutUs,
      data.isVerified ?? 'pending',
      data.isBlocked ?? false,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  updateProfile(updates: {
    companyName?: string;
    logo?: string;
    banner?: string;
    websiteLink?: string;
    employeeCount?: number;
    industry?: string;
    organisation?: string;
    aboutUs?: string;
  }): CompanyProfile {
    return new CompanyProfile(
      this.id,
      this.userId,
      updates.companyName ?? this.companyName,
      updates.logo ?? this.logo,
      updates.banner ?? this.banner,
      updates.websiteLink ?? this.websiteLink,
      updates.employeeCount ?? this.employeeCount,
      updates.industry ?? this.industry,
      updates.organisation ?? this.organisation,
      updates.aboutUs ?? this.aboutUs,
      this.isVerified,
      this.isBlocked,
      this.createdAt,
      new Date(), // Update timestamp
    );
  }

  verify(): CompanyProfile {
    if (this.isVerified !== 'pending') {
      throw new Error('Only pending profiles can be verified');
    }
    
    return new CompanyProfile(
      this.id,
      this.userId,
      this.companyName,
      this.logo,
      this.banner,
      this.websiteLink,
      this.employeeCount,
      this.industry,
      this.organisation,
      this.aboutUs,
      'verified',
      this.isBlocked,
      this.createdAt,
      new Date(),
    );
  }

  reject(): CompanyProfile {
    if (this.isVerified !== 'pending') {
      throw new Error('Only pending profiles can be rejected');
    }
    
    return new CompanyProfile(
      this.id,
      this.userId,
      this.companyName,
      this.logo,
      this.banner,
      this.websiteLink,
      this.employeeCount,
      this.industry,
      this.organisation,
      this.aboutUs,
      'rejected',
      this.isBlocked,
      this.createdAt,
      new Date(),
    );
  }

  block(): CompanyProfile {
    if (this.isBlocked) {
      throw new Error('Profile is already blocked');
    }
    
    return new CompanyProfile(
      this.id,
      this.userId,
      this.companyName,
      this.logo,
      this.banner,
      this.websiteLink,
      this.employeeCount,
      this.industry,
      this.organisation,
      this.aboutUs,
      this.isVerified,
      true,
      this.createdAt,
      new Date(),
    );
  }

  unblock(): CompanyProfile {
    if (!this.isBlocked) {
      throw new Error('Profile is not blocked');
    }
    
    return new CompanyProfile(
      this.id,
      this.userId,
      this.companyName,
      this.logo,
      this.banner,
      this.websiteLink,
      this.employeeCount,
      this.industry,
      this.organisation,
      this.aboutUs,
      this.isVerified,
      false,
      this.createdAt,
      new Date(),
    );
  }

  canBeVerified(): boolean {
    return this.isVerified === 'pending' && !this.isBlocked;
  }

  isActive(): boolean {
    return !this.isBlocked && this.isVerified === 'verified';
  }

  isPending(): boolean {
    return this.isVerified === 'pending';
  }

  isRejected(): boolean {
    return this.isVerified === 'rejected';
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.companyName || this.companyName.trim().length < 2) {
      errors.push('Company name must be at least 2 characters');
    }

    if (!this.industry || this.industry.trim().length < 2) {
      errors.push('Industry must be specified');
    }

    if (this.employeeCount < 1) {
      errors.push('Employee count must be at least 1');
    }

    if (!this.websiteLink || !this.isValidUrl(this.websiteLink)) {
      errors.push('Valid website URL is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      userId: this.userId,
      companyName: this.companyName,
      logo: this.logo,
      banner: this.banner,
      websiteLink: this.websiteLink,
      employeeCount: this.employeeCount,
      industry: this.industry,
      organisation: this.organisation,
      aboutUs: this.aboutUs,
      isVerified: this.isVerified,
      isBlocked: this.isBlocked,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(data: Record<string, unknown>): CompanyProfile {
    return new CompanyProfile(
      data.id as string,
      data.userId as string,
      data.companyName as string,
      data.logo as string,
      data.banner as string,
      data.websiteLink as string,
      data.employeeCount as number,
      data.industry as string,
      data.organisation as string,
      data.aboutUs as string,
      data.isVerified as 'pending' | 'rejected' | 'verified',
      data.isBlocked as boolean,
      new Date(data.createdAt as string),
      new Date(data.updatedAt as string),
    );
  }
}

export class CompanyContact {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly twitterLink: string,
    public readonly facebookLink: string,
    public readonly linkedin: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    companyId: string;
    twitterLink?: string;
    facebookLink?: string;
    linkedin?: string;
    email: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyContact {
    const now = new Date();
    return new CompanyContact(
      data.id,
      data.companyId,
      data.twitterLink ?? '',
      data.facebookLink ?? '',
      data.linkedin ?? '',
      data.email,
      data.phone ?? '',
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }
}

export class CompanyLocation {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly location: string,
    public readonly officeName: string,
    public readonly address: string,
    public readonly isHeadquarters: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    companyId: string;
    location: string;
    officeName: string;
    address: string;
    isHeadquarters?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyLocation {
    const now = new Date();
    return new CompanyLocation(
      data.id,
      data.companyId,
      data.location,
      data.officeName,
      data.address,
      data.isHeadquarters ?? false,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }
}

export class CompanyVerification {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly taxId: string,
    public readonly businessLicenseUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    companyId: string;
    taxId?: string;
    businessLicenseUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): CompanyVerification {
    const now = new Date();
    return new CompanyVerification(
      data.id,
      data.companyId,
      data.taxId ?? '',
      data.businessLicenseUrl ?? '',
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }
}