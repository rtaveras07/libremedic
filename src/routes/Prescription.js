import { Router } from 'express';
import PrescriptionController from '../controllers/PrescriptionController';

const router = Router();

router.get('/', PrescriptionController.getAll);
router.get('/:id', PrescriptionController.getById);
router.get('/patient/:patientId', PrescriptionController.getByPatientId);
router.put('/:id', PrescriptionController.update);
router.post('/', PrescriptionController.create);
router.delete('/:id', PrescriptionController.delete);

export default router; 