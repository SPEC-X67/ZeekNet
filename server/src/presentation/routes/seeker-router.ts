import { Router } from 'express';
import { seekerController } from '../../infrastructure/di/seekerDi';
import { authenticateToken } from '../middleware/auth.middleware';

export class SeekerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.use(authenticateToken);

    this.router.get('/jobs', seekerController.getAllJobPostings);
    this.router.get('/jobs/:id', seekerController.getJobPosting);
  }
}
