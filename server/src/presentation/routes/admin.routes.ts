import { Router } from 'express';
import { AdminController } from '../controllers/admin/admin.controller';
import { AdminJobController } from '../controllers/admin/admin-job.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import { UserBlockedMiddleware } from '../middleware/user-blocked.middleware';

export function createAdminRouter(
  adminController: AdminController,
  adminJobController: AdminJobController,
  userBlockedMiddleware: UserBlockedMiddleware,
): Router {
  const router = Router();

  router.use(authenticateToken);
  router.use(requireAdmin);
  router.use(userBlockedMiddleware.checkUserBlocked);

  router.get('/users', adminController.getAllUsers);
  router.get('/users/:userId', adminController.getUserById);
  router.patch('/users/block', adminController.blockUser);

  router.get('/companies', adminController.getAllCompanies);
  router.get('/companies/pending', adminController.getPendingCompanies);
  router.get('/companies/:companyId', adminController.getCompanyById);
  router.patch('/companies/verify', adminController.verifyCompany);
  router.patch('/companies/block', adminController.blockCompany);

  router.get('/jobs', adminJobController.getAllJobs);
  router.get('/jobs/stats', adminJobController.getJobStats);
  router.get('/jobs/:jobId', adminJobController.getJobById);
  router.patch('/jobs/:jobId/status', adminJobController.updateJobStatus);
  router.delete('/jobs/:jobId', adminJobController.deleteJob);

  return router;
}
