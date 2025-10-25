import { Router } from 'express';
import { adminController, adminJobController } from '../../infrastructure/di/adminDi';
import { requireAdmin } from '../middleware/admin.middleware';
import { authenticateToken } from '../middleware/auth.middleware';

export class AdminRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.use(authenticateToken);
    this.router.use(requireAdmin);

    this.router.get('/users', adminController.getAllUsers);
    this.router.patch('/users/block', adminController.blockUser);
    this.router.get('/users/:id', adminController.getUserById);

    this.router.get('/companies', adminController.getAllCompanies);
    this.router.get('/companies/verification', adminController.getPendingCompanies);
    this.router.patch('/companies/verify', adminController.verifyCompany);
    this.router.patch('/companies/block', adminController.blockCompany);

    this.router.get('/jobs', adminJobController.getAllJobs);
    this.router.get('/jobs/stats', adminJobController.getJobStats);
    this.router.get('/jobs/:id', adminJobController.getJobById);
    this.router.patch('/jobs/:id/status', adminJobController.updateJobStatus);
    this.router.delete('/jobs/:id', adminJobController.deleteJob);
  }
}
