import { Router } from 'express';
import {
  listAnalyses,
  getAnalysis,
  updateRequirementsExceptions
} from '../controllers/analysisController.js';

const router = Router();

router.get('/', listAnalyses);
router.get('/:id', getAnalysis);
router.put('/:id', updateRequirementsExceptions);

export default router;
