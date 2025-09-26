import { Router } from 'express';
import { AdminController } from '../controllers/admin/admin.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import { UserBlockedMiddleware } from '../middleware/user-blocked.middleware';

export function createAdminRouter(
  adminController: AdminController,
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

  return router;
}
