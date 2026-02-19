import { Router } from 'express';
import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/application.controller';

const router = Router();

router.route('/')
  .get(getApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplication)
  .put(updateApplication)
  .delete(deleteApplication);

export default router;