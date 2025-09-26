import { Router } from 'express';
import { SeekerController } from '../controllers/seeker/seeker.controller';

export function createSeekerRoutes(seekerController: SeekerController): Router {
  const router = Router();

  router.get('/jobs', seekerController.getAllJobPostings);
  router.get('/jobs/:id', seekerController.getJobPosting);

  return router;
}
