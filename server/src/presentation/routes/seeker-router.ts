import { Router } from 'express';
import { seekerController } from '../../infrastructure/di/seekerDi';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateQuery, validateBody } from '../middleware/validation.middleware';
import { uploadSingle } from '../middleware/upload.middleware';
import { JobPostingQueryDto } from '../../application/dto/job-posting/job-posting.dto';
import { 
  CreateSeekerProfileDto, 
  UpdateSeekerProfileDto, 
  AddExperienceDto, 
  UpdateExperienceDto, 
  AddEducationDto, 
  UpdateEducationDto, 
  UpdateSkillsDto,
  UpdateLanguagesDto, 
  UploadResumeDto, 
} from '../../application/dto/seeker/seeker-profile.dto';

export class SeekerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.use(authenticateToken);

    this.router.get('/jobs', validateQuery(JobPostingQueryDto), seekerController.getAllJobPostings);
    this.router.get('/jobs/:id', seekerController.getJobPosting);

    this.router.post('/profile', validateBody(CreateSeekerProfileDto), seekerController.createSeekerProfile);
    this.router.get('/profile', seekerController.getSeekerProfile);
    this.router.put('/profile', validateBody(UpdateSeekerProfileDto), seekerController.updateSeekerProfile);

    this.router.post('/profile/experiences', validateBody(AddExperienceDto), seekerController.addExperience);
    this.router.get('/profile/experiences', seekerController.getExperiences);
    this.router.put('/profile/experiences/:experienceId', validateBody(UpdateExperienceDto), seekerController.updateExperience);
    this.router.delete('/profile/experiences/:experienceId', seekerController.removeExperience);

    this.router.post('/profile/education', validateBody(AddEducationDto), seekerController.addEducation);
    this.router.get('/profile/education', seekerController.getEducation);
    this.router.put('/profile/education/:educationId', validateBody(UpdateEducationDto), seekerController.updateEducation);
    this.router.delete('/profile/education/:educationId', seekerController.removeEducation);

    this.router.put('/profile/skills', validateBody(UpdateSkillsDto), seekerController.profileController.updateSkills);

    this.router.put('/profile/languages', validateBody(UpdateLanguagesDto), seekerController.profileController.updateLanguages);

    this.router.post('/profile/resume', validateBody(UploadResumeDto), seekerController.profileController.uploadResume);
    this.router.delete('/profile/resume', seekerController.profileController.removeResume);

    this.router.post('/profile/avatar', uploadSingle('avatar'), seekerController.profileController.uploadAvatar);
    this.router.post('/profile/banner', uploadSingle('banner'), seekerController.profileController.uploadBanner);

    this.router.put('/profile/name', seekerController.profileController.updateName);
  }
}