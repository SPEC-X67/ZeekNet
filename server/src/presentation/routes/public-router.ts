import { Router } from 'express';
import { publicJobController } from '../../infrastructure/di/publicDi';

export class PublicRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Public job routes (no authentication required)
    this.router.get('/jobs', publicJobController.getAllJobPostings);
    this.router.get('/jobs/:id', publicJobController.getJobPosting);
  }
}
