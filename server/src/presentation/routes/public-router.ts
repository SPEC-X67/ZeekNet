import { Router } from 'express';
import { publicJobController } from '../../infrastructure/di/publicDi';

export class PublicRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.get('/jobs', publicJobController.getAllJobPostings);
    this.router.get('/jobs/:id', publicJobController.getJobPosting);
  }
}
