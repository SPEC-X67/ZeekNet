import { Router } from 'express';
import { seekerController } from '../../infrastructure/di/seekerDi';
import { authenticateToken } from '../middleware/auth.middleware';

export class SeekerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Apply auth middleware to all seeker routes
    this.router.use(authenticateToken);

    // Job search routes
    this.router.get('/jobs', seekerController.getAllJobPostings);
    this.router.get('/jobs/:id', seekerController.getJobPosting);
  }
}
