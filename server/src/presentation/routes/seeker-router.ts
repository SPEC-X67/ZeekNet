import { Router } from 'express';
import { seekerController } from '../../infrastructure/di/seekerDi';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateQuery } from '../middleware/validation.middleware';
import { JobPostingQueryDto } from '../../application/dto/job-posting/job-posting.dto';

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
  }
}
