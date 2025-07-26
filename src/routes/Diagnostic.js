import { Router } from 'express';
import DiagnosticController from '../controllers/DiagnosticController';

const router = Router();

router.get('/', DiagnosticController.getAll);
router.get('/:id', DiagnosticController.getById);
router.get('/patient/:patientId', DiagnosticController.getByPatientId);
router.get('/doctor/:doctorId', DiagnosticController.getByDoctorId);
router.get('/status/:status', DiagnosticController.getByStatus);
router.put('/:id', DiagnosticController.update);
router.post('/', DiagnosticController.create);
router.delete('/:id', DiagnosticController.delete);

export default router; 