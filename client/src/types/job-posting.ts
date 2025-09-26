export interface JobPostingData {
  title: string;
  employmentTypes: string[];
  salary: {
    min: number;
    max: number;
  };
  categoryIds: string[];
  skillsRequired: string[];
  location: string;
  
  description: string;
  responsibilities: string[];
  qualifications: string[];
  niceToHaves: string[];
  
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface JobPostingStepProps {
  data: JobPostingData;
  onDataChange: (data: Partial<JobPostingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: () => void;
}
