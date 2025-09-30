// Company Profile Types
export interface CompanyProfileData {
  userId: string;
  companyName: string;
  logo: string;
  banner: string;
  websiteLink: string;
  employeeCount: number;
  industry: string;
  organisation: string;
  aboutUs: string;
  isVerified: 'pending';
  isBlocked: boolean;
}

export interface CompanyContactData {
  companyId: string;
  email: string;
  phone: string;
  twitterLink: string;
  facebookLink: string;
  linkedin: string;
}

export interface CompanyLocationData {
  companyId: string;
  location: string;
  officeName: string;
  address: string;
  isHeadquarters: boolean;
}

export interface CompanyVerificationData {
  companyId: string;
  taxId: string;
  businessLicenseUrl: string;
}

export interface CompanyProfileResponseDto {
  id: string;
  company_name: string;
  logo: string;
  banner: string;
  website_link: string;
  employee_count: number;
  industry: string;
  organisation: string;
  about_us: string;
  is_verified: 'pending' | 'rejected' | 'verified';
  is_blocked: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CompanyContactResponseDto {
  id: string;
  email: string;
  phone: string;
  twitter_link: string;
  facebook_link: string;
  linkedin: string;
}

export interface CompanyLocationResponseDto {
  id: string;
  location: string;
  office_name: string;
  address: string;
  is_headquarters: boolean;
}

export interface CompanyProfileWithDetailsResponseDto {
  profile: CompanyProfileResponseDto;
  contact: CompanyContactResponseDto | null;
  locations: CompanyLocationResponseDto[];
  techStack: {
    id: string;
    techStack: string;
  }[];
  benefits: {
    id: string;
    perk: string;
    description: string;
  }[];
  team: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    instagram?: string;
    linkedin?: string;
  }[];
  workplacePictures: {
    id: string;
    pictureUrl: string;
    caption?: string;
  }[];
  jobPostings: {
    id: string;
    title: string;
    description: string;
    location: string;
    employmentType: string;
    salaryMin?: number;
    salaryMax?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

// Job Posting Types
export interface JobPostingData {
  company_id: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: { min: number; max: number };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
}

export interface JobPostingResponseDto {
  id: string;
  company_id: string;
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  nice_to_haves: string[];
  benefits: string[];
  salary: { min: number; max: number };
  employment_types: string[];
  location: string;
  skills_required: string[];
  category_ids: string[];
  is_active: boolean;
  view_count: number;
  application_count: number;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  refreshToken: string | null;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  is_blocked: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
