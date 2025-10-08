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
    public readonly foundedDate?: Date,
    public readonly phone?: string,
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
    foundedDate?: Date;
    phone?: string;
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
      data.foundedDate,
      data.phone,
    );
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
      foundedDate: this.foundedDate?.toISOString(),
      phone: this.phone,
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
      data.foundedDate ? new Date(data.foundedDate as string) : undefined,
      data.phone as string,
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