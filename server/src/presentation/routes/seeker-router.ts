import { Router } from 'express';
import { seekerController } from '../../infrastructure/di/seekerDi';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateQuery, validateBody } from '../middleware/validation.middleware';
import { JobPostingQueryDto } from '../../application/dto/job-posting/job-posting.dto';
import { 
  CreateSeekerProfileDto, 
  UpdateSeekerProfileDto, 
  AddExperienceDto, 
  UpdateExperienceDto, 
  AddEducationDto, 
  UpdateEducationDto, 
  UpdateSkillsDto, 
  UploadResumeDto 
} from '../../application/dto/seeker/seeker-profile.dto';

export class SeekerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.use(authenticateToken);

    // Job routes
    this.router.get('/jobs', validateQuery(JobPostingQueryDto), seekerController.getAllJobPostings);
    this.router.get('/jobs/:id', seekerController.getJobPosting);

    // Profile routes
    this.router.post('/profile', validateBody(CreateSeekerProfileDto), seekerController.createSeekerProfile);
    this.router.get('/profile', seekerController.getSeekerProfile);
    this.router.put('/profile', validateBody(UpdateSeekerProfileDto), seekerController.updateSeekerProfile);

    // Experience routes
    this.router.post('/profile/experiences', validateBody(AddExperienceDto), seekerController.addExperience);
    this.router.get('/profile/experiences', seekerController.getExperiences);
    this.router.put('/profile/experiences/:experienceId', validateBody(UpdateExperienceDto), seekerController.updateExperience);
    this.router.delete('/profile/experiences/:experienceId', seekerController.removeExperience);

    // Education routes
    this.router.post('/profile/education', validateBody(AddEducationDto), seekerController.addEducation);
    this.router.get('/profile/education', seekerController.getEducation);
    this.router.put('/profile/education/:educationId', validateBody(UpdateEducationDto), seekerController.updateEducation);
    this.router.delete('/profile/education/:educationId', seekerController.removeEducation);

    // Skills routes
    this.router.put('/profile/skills', validateBody(UpdateSkillsDto), seekerController.updateSkills);

    // Resume routes
    this.router.post('/profile/resume', validateBody(UploadResumeDto), seekerController.uploadResume);
    this.router.delete('/profile/resume', seekerController.removeResume);
  }
}
