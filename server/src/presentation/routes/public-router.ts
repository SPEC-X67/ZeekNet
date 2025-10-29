import { Router } from 'express';
import { publicJobController } from '../../infrastructure/di/publicDi';
import { validateQuery } from '../middleware/validation.middleware';
import { JobPostingQueryDto } from '../../application/dto/job-posting/job-posting.dto';

export class PublicRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.get('/jobs', validateQuery(JobPostingQueryDto), publicJobController.getAllJobPostings);
    this.router.get('/jobs/:id', publicJobController.getJobPosting);
  }
}
