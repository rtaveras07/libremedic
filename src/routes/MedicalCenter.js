import { Router } from 'express';
import MedicalCenterController from '../controllers/MedicalCenterController';

const router = Router();

router.get('/', MedicalCenterController.getAll);
router.get('/:id', MedicalCenterController.getById);
router.get('/user/:userId', MedicalCenterController.getByUserId);
router.put('/:id', MedicalCenterController.update);
router.post('/', MedicalCenterController.create);
router.delete('/:id', MedicalCenterController.delete);

export default router; 