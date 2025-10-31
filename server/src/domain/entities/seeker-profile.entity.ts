export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  employmentType: string;
  location?: string;
  description?: string;
  technologies: string[];
  isCurrent: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
}

export interface ResumeMeta {
  url: string;
  fileName: string;
  uploadedAt: Date;
}

export interface SocialLink {
  name: string;
  link: string;
}

export class SeekerProfile {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly headline: string | null,
    public readonly summary: string | null,
    public readonly location: string | null,
    public readonly phone: string | null,
    public readonly email: string,
    public readonly avatarUrl: string | null,
    public readonly skills: string[],
    public readonly socialLinks: SocialLink[],
    public readonly resume: ResumeMeta | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    userId: string;
    headline?: string;
    summary?: string;
    location?: string;
    phone?: string;
    email: string;
    avatarUrl?: string;
    skills?: string[];
    socialLinks?: SocialLink[];
    resume?: ResumeMeta;
    createdAt?: Date;
    updatedAt?: Date;
  }): SeekerProfile {
    const now = new Date();
    return new SeekerProfile(
      data.id,
      data.userId,
      data.headline ?? null,
      data.summary ?? null,
      data.location ?? null,
      data.phone ?? null,
      data.email,
      data.avatarUrl ?? null,
      data.skills ?? [],
      data.socialLinks ?? [],
      data.resume ?? null,
      data.createdAt ?? now,
      data.updatedAt ?? now,
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      userId: this.userId,
      headline: this.headline,
      summary: this.summary,
      location: this.location,
      phone: this.phone,
      email: this.email,
      avatarUrl: this.avatarUrl,
      skills: this.skills,
      socialLinks: this.socialLinks,
      resume: this.resume,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(data: Record<string, unknown>): SeekerProfile {
    return new SeekerProfile(
      data.id as string,
      data.userId as string,
      (data.headline as string) ?? null,
      (data.summary as string) ?? null,
      (data.location as string) ?? null,
      (data.phone as string) ?? null,
      data.email as string,
      (data.avatarUrl as string) ?? null,
      (data.skills as string[]) ?? [],
      (data.socialLinks as SocialLink[]) ?? [],
      (data.resume as ResumeMeta) ?? null,
      new Date(data.createdAt as string),
      new Date(data.updatedAt as string),
    );
  }
}
