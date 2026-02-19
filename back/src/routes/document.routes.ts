import { Router } from 'express';
import {
  addDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  toggleDocumentStatus
} from '../controllers/document.controller';

const router = Router({ mergeParams: true });

router.route('/')
  .get(getDocuments)
  .post(addDocument);

router.route('/:id')
  .put(updateDocument)
  .delete(deleteDocument);

router.patch('/:id/toggle', toggleDocumentStatus);

export default router;