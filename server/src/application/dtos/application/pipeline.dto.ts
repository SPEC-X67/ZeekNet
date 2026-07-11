// responses/job-applications-kanban-response.dto.ts
export interface JobApplicationKanbanItem {
  id: string;
  seekerId: string;
  seekerName?: string;
  seekerAvatar?: string;
  jobTitle?: string;
  atsScore?: number;
  subStage: string;
  appliedDate: Date;
}
export interface JobApplicationsKanbanResponseDto {
  [stage: string]: JobApplicationKanbanItem[];
}

// responses/job-ats-pipeline-response.dto.ts
export interface JobATSPipelineResponseDto {
  jobId: string;
  enabledStages: string[];
  pipelineConfig: Record<string, string[]>;
}
