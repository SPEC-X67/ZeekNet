import { JobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { SeekerProfileRepository } from '../database/mongodb/repositories/seeker-profile.repository';
import { SeekerExperienceRepository } from '../database/mongodb/repositories/seeker-experience.repository';
import { SeekerEducationRepository } from '../database/mongodb/repositories/seeker-education.repository';
import { UserRepository } from '../database/mongodb/repositories/user.repository';
import { GetAllJobPostingsUseCase } from '../../application/use-cases/public/get-all-job-postings.use-case';
import { GetJobPostingUseCase } from '../../application/use-cases/company/get-job-posting.use-case';
import { IncrementJobViewCountUseCase } from '../../application/use-cases/company/increment-job-view-count.use-case';
import { SeekerController } from '../../presentation/controllers/seeker/seeker.controller';
import { SeekerProfileController } from '../../presentation/controllers/seeker/seeker-profile.controller';
import { CreateSeekerProfileUseCase } from '../../application/use-cases/seeker/create-seeker-profile.use-case';
import { GetSeekerProfileUseCase } from '../../application/use-cases/seeker/get-seeker-profile.use-case';
import { UpdateSeekerProfileUseCase } from '../../application/use-cases/seeker/update-seeker-profile.use-case';
import { AddExperienceUseCase } from '../../application/use-cases/seeker/add-experience.use-case';
import { GetExperiencesUseCase } from '../../application/use-cases/seeker/get-experiences.use-case';
import { UpdateExperienceUseCase } from '../../application/use-cases/seeker/update-experience.use-case';
import { RemoveExperienceUseCase } from '../../application/use-cases/seeker/remove-experience.use-case';
import { AddEducationUseCase } from '../../application/use-cases/seeker/add-education.use-case';
import { GetEducationUseCase } from '../../application/use-cases/seeker/get-education.use-case';
import { UpdateEducationUseCase } from '../../application/use-cases/seeker/update-education.use-case';
import { RemoveEducationUseCase } from '../../application/use-cases/seeker/remove-education.use-case';
import { UpdateSkillsUseCase } from '../../application/use-cases/seeker/update-skills.use-case';
import { UpdateLanguagesUseCase } from '../../application/use-cases/seeker/update-languages.use-case';
import { UploadResumeUseCase } from '../../application/use-cases/seeker/upload-resume.use-case';
import { RemoveResumeUseCase } from '../../application/use-cases/seeker/remove-resume.use-case';
import { S3Service } from '../external-services/s3/s3.service';

const jobPostingRepository = new JobPostingRepository();
const seekerProfileRepository = new SeekerProfileRepository();
const seekerExperienceRepository = new SeekerExperienceRepository();
const seekerEducationRepository = new SeekerEducationRepository();
const userRepository = new UserRepository(); 
const s3Service = new S3Service();

const getAllJobPostingsUseCase = new GetAllJobPostingsUseCase(jobPostingRepository);
const getJobPostingUseCase = new GetJobPostingUseCase(jobPostingRepository);
const incrementJobViewCountUseCase = new IncrementJobViewCountUseCase(jobPostingRepository);

const createSeekerProfileUseCase = new CreateSeekerProfileUseCase(seekerProfileRepository, s3Service);
const getSeekerProfileUseCase = new GetSeekerProfileUseCase(seekerProfileRepository, seekerExperienceRepository, seekerEducationRepository, userRepository, s3Service);
const updateSeekerProfileUseCase = new UpdateSeekerProfileUseCase(seekerProfileRepository, s3Service);
const addExperienceUseCase = new AddExperienceUseCase(seekerProfileRepository, seekerExperienceRepository);
const getExperiencesUseCase = new GetExperiencesUseCase(seekerProfileRepository, seekerExperienceRepository);
const updateExperienceUseCase = new UpdateExperienceUseCase(seekerProfileRepository, seekerExperienceRepository);
const removeExperienceUseCase = new RemoveExperienceUseCase(seekerProfileRepository, seekerExperienceRepository);
const addEducationUseCase = new AddEducationUseCase(seekerProfileRepository, seekerEducationRepository);
const getEducationUseCase = new GetEducationUseCase(seekerProfileRepository, seekerEducationRepository);
const updateEducationUseCase = new UpdateEducationUseCase(seekerProfileRepository, seekerEducationRepository);
const removeEducationUseCase = new RemoveEducationUseCase(seekerProfileRepository, seekerEducationRepository);
const updateSkillsUseCase = new UpdateSkillsUseCase(seekerProfileRepository);
const updateLanguagesUseCase = new UpdateLanguagesUseCase(seekerProfileRepository);
const uploadResumeUseCase = new UploadResumeUseCase(seekerProfileRepository);
const removeResumeUseCase = new RemoveResumeUseCase(seekerProfileRepository);

const seekerProfileController = new SeekerProfileController(
  createSeekerProfileUseCase,
  getSeekerProfileUseCase,
  updateSeekerProfileUseCase,
  addExperienceUseCase,
  getExperiencesUseCase,
  updateExperienceUseCase,
  removeExperienceUseCase,
  addEducationUseCase,
  getEducationUseCase,
  updateEducationUseCase,
  removeEducationUseCase,
  updateSkillsUseCase,
  updateLanguagesUseCase,
  uploadResumeUseCase,
  removeResumeUseCase,
  s3Service,
  userRepository,
);

const seekerController = new SeekerController(
  getJobPostingUseCase,
  getAllJobPostingsUseCase,
  incrementJobViewCountUseCase,
  seekerProfileController,
);

export { seekerController, seekerProfileRepository };