import { Router } from 'express';
import { PublicJobController } from '../controllers/public/public-job.controller';
import { validateQuery } from '../middleware/validation.middleware';
import { JobPostingQueryDto } from '../../application/dto/job-posting/job-posting.dto';

export function createPublicRouter(
  publicJobController: PublicJobController,
): Router {
  const router = Router();

  // Public job listings - no authentication required
  router.get('/jobs', validateQuery(JobPostingQueryDto), publicJobController.getAllJobPostings);
  router.get('/jobs/:id', publicJobController.getJobPosting);

  return router;
}
